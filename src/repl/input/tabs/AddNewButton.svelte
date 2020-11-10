<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
</script>

<style>
  .add-new {
		position: absolute;
		left: 0;
		top: 0;
		padding: 12px 10px 8px 0 !important;
		height: 40px;
		text-align: center;
		background-color: white;
	}

	.add-new:hover {
		color: var(--flash) !important;
	}

  svg {
		position: relative;
		overflow: hidden;
		vertical-align: middle;
		-o-object-fit: contain;
		object-fit: contain;
		-webkit-transform-origin: center center;
		transform-origin: center center;

		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
</style>

<button
  title="add new component"
  class="add-new" 
  on:click={e => { dispatch('click', e) }}
>

	<svg width="12" height="12" viewBox="0 0 24 24">
		<line stroke="#999" x1='12' y1='5' x2='12' y2='19' />
		<line stroke="#999" x1='5' y1='12' x2='19' y2='12' />
	</svg>

</button>