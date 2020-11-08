<script>
  import Tabs from './Tabs.svelte'
  import Editor from './codemirror/Editor.svelte'

	export let replFiles
  
  let textarea
  let currentFileId

	function getMaxId (replFiles) {
		const ids = replFiles.map(({ id }) => id)
		return Math.max(...ids)
	}

	function newComponent () {
		const id = getMaxId(replFiles) + 1

		components = components.concat({
			id,
			name: `Component${id}`,
			type: 'svelte',
			source: '',
		})

		currentFileId = id
		textarea.focus()
	}

  $: currentFileIndex = replFiles.findIndex(({ id }) => id === currentFileId)
  $: currentCode = replFiles[currentFileId].source
</script>

<section>
	<Tabs
		{replFiles}
		{currentFileId}
		on:select={id => (currentFileId = id)}
		on:new={newComponent}
  />
	<Editor bind:this={textarea} />
</section>
