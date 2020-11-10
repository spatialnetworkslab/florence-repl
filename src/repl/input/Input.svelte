<script>
  import { tick } from 'svelte'
  import Editor from './codemirror/Editor.svelte'
  import Tabs from './tabs/Tabs.svelte'

  export let replFiles
  export let currentFileName

  $: currentFile = replFiles[currentFileName]

  function updateCurrentFile (newCode) {
    replFiles[currentFileName].source = newCode.detail
  }
</script>

<section>

	<Tabs
		bind:replFiles
		bind:currentFileName
  />

	<Editor 
    {currentFile}
    on:change={updateCurrentFile}
  />

</section>
