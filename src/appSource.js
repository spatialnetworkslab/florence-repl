export default `
<script>
  import Component from './Component1.svelte'
  import { Graphic, Point } from '@snlab/florence'
  import DataContainer from '@snlab/florence-datacontainer'

  const dc = new DataContainer({ a: [1, 2, 3] })
  console.log(dc.column('a'))
</script>

<Component />

<Graphic width={500} height={500}>
  <Point x={250} y={250} radius={50} />
</Graphic>
`
