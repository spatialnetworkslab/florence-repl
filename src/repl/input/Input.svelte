<script>
  import { tick } from 'svelte'
  import Editor from './codemirror/Editor.svelte'
  import Tabs from './tabs/Tabs.svelte'
  import getFileIndex from '../../utils/getFileIndex.js'

  export let replFiles
  export let currentFileId

  $ :currentFileIndex = getFileIndex(replFiles, currentFileId)
  $: currentFile = replFiles[currentFileIndex]

  function updateCurrentFile (newCode) {
    replFiles[currentFileIndex].source = newCode.detail
  }
</script>

<section style="width: 100%;">

	<Tabs
		bind:replFiles
		bind:currentFileId
  />

	<Editor 
    {currentFile}
    on:change={updateCurrentFile}
  />

</section>
