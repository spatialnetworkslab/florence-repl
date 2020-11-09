// export default `
// <script>
//   import Component from './Component1.svelte'
//   import { Graphic, Point } from '@snlab/florence'
// </script>

// <Component />

// <Graphic width={500} height={500}>
//   <Point x={250} y={250} radius={50} />
// </Graphic>
// `

// export default `
// <script>
//   import Component from './Component1.svelte'
//   import DataContainer from '@snlab/florence-datacontainer'
// </script>

// <Component />
// `

// export default `
// <script>
//   import Component from './Component1.svelte'
// </script>

// <Component />
// `

export default `
<script>
  import Component from './Component1.svelte'
  import { test } from 'my-test-dependency'

  console.log(test)
</script>

<Component />
`
