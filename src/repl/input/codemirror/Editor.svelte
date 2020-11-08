<script>
  import CodeMirror from './codemirror.js'
  import { onMount, createEventDispatcher, tick } from 'svelte'
  import { createCodemirrorOptions } from './createCodemirrorOptions.js'
  import { sleep } from '../../../utils/sleep.js'
  
  const dispatch = createEventDispatcher()

  export let currentFile

  // Option props
	export let readonly = false
	// export let errorLoc = null
	export let flex = false
	export let lineNumbers = true
  export let tab = true
  
  // Reference to <textarea> HTML element
  let textArea

  // Current file type
  let editorFileType

  // State for lifecycle management
  let firstUpdate = true
  let mounted = false
  let destroyed = false
  let updatingExternally = false

  // Stuff related to 'markers' and errors (not sure what this does)
  // let marker
  // let errorLine
  // let previousErrorLine

  // Editor
  let editor

  // Set destroyed to true when component is destroyed
  onMount(async () => {
    editorFileType = currentFile.type
    await createEditor()
    updateExternal()

    mounted = true

		return () => {
			destroyed = true;
			if (editor) editor.toTextArea()
		}
  })

  // Convenience function to create editors
  async function createEditor () {
    if (destroyed) return

		if (editor) editor.toTextArea()

    // Creating a text editor is a lot of work, so we yield
		// the main thread for a moment. This helps reduce jank
		if (firstUpdate) await sleep(50)

		if (destroyed) return

    const options = createCodemirrorOptions(
      lineNumbers,
      editorFileType,
      readonly,
      tab
    )

		editor = CodeMirror.fromTextArea(textArea, options);

		editor.on('change', instance => {
      // Skip dispatch if the update is external
      // Avoids infinite loop
			if (!updatingExternally) {
        const newCode = instance.getValue()
				dispatch('change', newCode)
			}
		})

    if (firstUpdate) await sleep(50)

		editor.refresh()

		firstUpdate = false
  }

  // Handle external changes to current file
  $: {
    if (mounted) updateExternal(currentFile)
  }

  async function updateExternal () {
    updatingExternally = true
            
    if (editorFileType !== currentFile.type) {
      editorFileType = currentFile.type
      await createEditor()
    }

    editor.setValue(currentFile.source)

    updatingExternally = false
  }

  // Something with the errors and markers again
  // $: {
	// 	if (marker) marker.clear()

	// 	if (errorLoc) {
	// 		const line = errorLoc.line - 1
	// 		const ch = errorLoc.column

	// 		marker = editor.markText({ line, ch }, { line, ch: ch + 1 }, {
	// 			className: 'error-loc'
	// 		})

	// 		errorLine = line
	// 	} else {
	// 		errorLine = null
	// 	}
	// }

	// $: if (editor) {
	// 	if (previousErrorLine !== null) {
	// 		editor.removeLineClass(previousErrorLine, 'wrap', 'error-line')
	// 	}

	// 	if (errorLine && (errorLine !== previousErrorLine)) {
	// 		editor.addLineClass(errorLine, 'wrap', 'error-line')
	// 		previousErrorLine = errorLine
	// 	}
	// }
</script>

<style>
	.codemirror-container {
		position: relative;
		width: 100%;
		height: 100%;
		border: none;
		line-height: 1.5;
		overflow: hidden;
    text-align: left;
	}

	.codemirror-container :global(.CodeMirror) {
		height: 100%;
		background: transparent;
		font: 400 14px/1.7 var(--font-mono);
		color: var(--base);
	}

	.codemirror-container.flex :global(.CodeMirror) {
		height: auto;
	}

	.codemirror-container.flex :global(.CodeMirror-lines) {
		padding: 0;
	}

	.codemirror-container :global(.CodeMirror-gutters) {
		padding: 0 16px 0 8px;
		border: none;
	}

	.codemirror-container :global(.error-loc) {
		position: relative;
		border-bottom: 2px solid #da106e;
	}

	.codemirror-container :global(.error-line) {
		background-color: rgba(200, 0, 0, .05);
	}

	textarea {
		visibility: hidden;
	}
</style>

<!-- <div class='codemirror-container' class:flex bind:offsetWidth={w} bind:offsetHeight={h}> -->
<div class="codemirror-container" class:flex>

	<textarea
		tabindex='2'
		bind:this={textArea}
		readonly
	/>

</div>