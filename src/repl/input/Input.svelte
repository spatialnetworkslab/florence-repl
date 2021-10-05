<script>
  import { onMount } from 'svelte'
  import Editor from './codemirror/Editor.svelte'
  import Tabs from './tabs/Tabs.svelte'
  import getFileIndex from '../../utils/getFileIndex.js'

  export let replFiles
  export let currentFileId
  export let fontSize

  $ :currentFileIndex = getFileIndex(replFiles, currentFileId)
  $: currentFile = replFiles[currentFileIndex]

  function updateCurrentFile (newCode) {
    replFiles[currentFileIndex].source = newCode.detail
  }
</script>

<style>
  .input-container {
    height: 100%; 
    width: 100%;
    border-right:
    2px solid #ddd;
    display: flex;
    flex-direction: column;
  }
</style>

<div class="input-container">

  <Tabs
    bind:replFiles
    bind:currentFileId
  />

  <div style="height: calc(100% - 35px);">
    <Editor 
      {currentFile}
      on:change={updateCurrentFile}
      {fontSize}
    />
  </div>

</div>
