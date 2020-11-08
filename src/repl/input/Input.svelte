<script>
  import Tabs from './Tabs.svelte'
  import Editor from './codemirror/Editor.svelte'

  export let replFiles
  export let currentFileName

  function updateCurrentFile (newCode) {
    replFiles[currentFileName].source = newCode
    replFiles = replFiles // needed for reactivity
  }
</script>

<section>

	<Tabs
		bind:replFiles
		bind:currentFileName
  />

	<Editor 
    currentFile={replFiles[currentFileName]}
    on:change={updateCurrentFile}
  />

</section>
