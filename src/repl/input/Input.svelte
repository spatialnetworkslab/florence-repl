<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import Editor from './codemirror/Editor.svelte'
  import Tabs from './tabs/Tabs.svelte'
  import getFileIndex from '../../utils/getFileIndex.js'

  const dispatch = createEventDispatcher()

  export let replFiles
  export let currentFileId
  export let fontSize
  export let bundling

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
    border-right: 2px solid #ddd;
    position: relative;
  }

  .flex {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .recompile-button-container {
    display: flex;
    justify-content: center;
  }

  .recompile-button {
    position: absolute;
    margin: 0px auto;
    bottom: 0px;
    height: 40px;
    padding: 15px 22px;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px 5px 0px 0px;
    z-index: 2;
  }

  .recompile-button:hover {
    background-color: #FCFCFC;
    cursor: pointer;
  }

  .recompile-button:disabled,
  .recompile-button[disabled] {
    cursor: not-allowed;
    background-color: #eee;
  }
</style>

<div class="input-container">

  <div class="flex">
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

  <div class="recompile-button-container">
    <button 
      class="recompile-button"
      disabled={bundling}
      on:click={() => dispatch('bundle')}
    >
      Recompile
    </button>
  </div>

</div>
