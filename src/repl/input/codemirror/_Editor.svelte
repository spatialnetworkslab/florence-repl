<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import CodeMirror from './codemirror.js'
  import { sleep } from '../../../utils/sleep.js'
	// import Message from './Message.svelte'

	const dispatch = createEventDispatcher()

  // Option props
	export let readonly = false
	export let errorLoc = null
	export let flex = false
	export let lineNumbers = true
	export let tab = true

  // Component state
  let w
	let h
	let code = ''
	let mode // either 'js', 'json', 'svelte' or 'md'

	let textArea // Bound to <textarea> tag
	let editor
	let updating_externally = false
	let marker
	let error_line
  let destroyed = false

  let previous_error_line
  let first = true // First time render

	// Component methods
	export async function set(newCode, newMode) {
    // If we are switching to a different file format...
		if (newMode !== mode) {
      mode = newMode
      // We need a different type of editor
			await createEditor()
		}

		code = new_code;
		updating_externally = true;
		if (editor) editor.setValue(code);
		updating_externally = false;
	}

	// export function update(new_code) {
	// 	code = new_code;

	// 	if (editor) {
	// 		const { left, top } = editor.getScrollInfo();
	// 		editor.setValue(code = new_code);
	// 		editor.scrollTo(left, top);
	// 	}
	// }

	// export function resize() {
	// 	editor.refresh();
	// }

	export function focus() {
		editor.focus();
	}

	// export function getHistory() {
	// 	return editor.getHistory();
	// }

	// export function setHistory(history) {
	// 	editor.setHistory(history);
	// }

	// export function clearHistory() {
	// 	if (editor) editor.clearHistory();
  // }

  // Update logic
	$: if (editor && w && h) {
		editor.refresh();
	}

	$: {
		if (marker) marker.clear();

		if (errorLoc) {
			const line = errorLoc.line - 1;
			const ch = errorLoc.column;

			marker = editor.markText({ line, ch }, { line, ch: ch + 1 }, {
				className: 'error-loc'
			});

			error_line = line;
		} else {
			error_line = null;
		}
	}

	$: if (editor) {
		if (previous_error_line != null) {
			editor.removeLineClass(previous_error_line, 'wrap', 'error-line')
		}

		if (error_line && (error_line !== previous_error_line)) {
			editor.addLineClass(error_line, 'wrap', 'error-line');
			previous_error_line = error_line;
		}
	}

	onMount(() => {
		return () => {
			destroyed = true;
			if (editor) editor.toTextArea();
		}
	});

	async function createEditor(mode) {
		if (destroyed) return

		if (editor) editor.toTextArea()

    // Creating a text editor is a lot of work, so we yield
		// the main thread for a moment. This helps reduce jank
		if (first) await sleep(50)

		if (destroyed) return

    const options = createCodeMirrorOptions(
      lineNumbers,
      mode,
      readonly,
      tab
    )

		editor = CodeMirror.fromTextArea(textArea, options);

		editor.on('change', instance => {
			if (!updating_externally) {
				const value = instance.getValue();
				dispatch('change', { value });
			}
		});

		if (first) await sleep(50);
		editor.refresh();

		first = false;
	}
</script>

<style>
	.codemirror-container {
		position: relative;
		width: 100%;
		height: 100%;
		border: none;
		line-height: 1.5;
		overflow: hidden;
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

	/* pre {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		border: none;
		padding: 4px 4px 4px 60px;
		resize: none;
		font-family: var(--font-mono);
		font-size: 13px;
		line-height: 1.7;
		user-select: none;
		pointer-events: none;
		color: #ccc;
		tab-size: 2;
		-moz-tab-size: 2;
	}

	.flex pre {
		padding: 0 0 0 4px;
		height: auto;
	} */
</style>

<div class='codemirror-container' class:flex bind:offsetWidth={w} bind:offsetHeight={h}>

	<!-- svelte-ignore a11y-positive-tabindex -->
	<textarea
		tabindex='2'
		bind:this={textArea}
		readonly
		value={code}
	/>

	<!-- {#if !CodeMirror}
		<pre style="position: absolute; left: 0; top: 0">
      {code}
    </pre>

		<div style="position: absolute; width: 100%; bottom: 0">
			<Message kind='info'>loading editor...</Message>
    </div>
	{/if} -->
</div>