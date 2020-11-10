<script>
  import { createEventDispatcher } from 'svelte'
  import EditableTab from './EditableTab.svelte'

  const dispatch = createEventDispatcher()

  export let replFile
  export let currentFileName
  export let fileNameBeingEdited

  let over = null
</script>

<style>
  .button {
		position: relative;
		display: inline-block;
		font: 400 12px/1.5 var(--font);
		background: white;
		border: none;
		border-bottom: 3px solid transparent;
		padding: 12px 14px 8px 16px;
		margin: 0;
		color: #999;
		border-radius: 0;
		cursor: pointer;
  }

  .button.active {
		/* color: var(--second); */
		color: #333;
		border-bottom: 3px solid var(--prime);
	}

	/* .button.active .editable {
		cursor: text;
	}

	.button.active .remove {
		display: block;
	} */

	.button.drag-over {
		background: #67677814;
	}

	.button.drag-over {
		cursor: move;
	}

	.drag-handle {
		cursor: move;
		width: 5px;
		height: 25px;
		position: absolute;
		left: 5px;
		top: 9px;
		--drag-handle-color: #dedede;
		background: linear-gradient(to right,
			var(--drag-handle-color) 1px, white 1px,
			white 2px, var(--drag-handle-color) 2px,
			var(--drag-handle-color) 3px, white 3px,
			white 4px, var(--drag-handle-color) 4px
		);
	}

  .uneditable {
    display: inline-block;
		position: relative;
		line-height: 1;
  }
</style>

<div
	id={replFile.fileName}
	class="button"
	role="button"
	class:active="{replFile.fileName === currentFileName}"
	class:draggable={replFile.fileName !== fileNameBeingEdited}
	class:drag-over={replFile.fileName === over}
	on:click={e => dispatch('click', e)} 
	on:dblclick="{e => e.stopPropagation()}"
	draggable={replFile.fileName !== fileNameBeingEdited}
	on:dragstart={e => { dispatch('dragstart', e) }}
	on:dragover={e => { dispatch('dragover', e)}}
	on:dragleave={e => { dispatch('dragleave', e)}}
	on:drop={e => { dispatch('dragend', e)}}
>

  <i class="drag-handle"></i>

	{#if replFile.fileName === 'App.svelte'}

		<div class="uneditable">
			App.svelte
		</div>

  {:else}

		<EditableTab />

	{/if}
</div>