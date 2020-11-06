const testDependency = `import testDep2 from 'my-test-dependency2'
export default function() {
  console.log(testDep2)
}`

const testDependency2 = 'export default { foo: \'bar\' }'

export const dependencyLookup = {
  'my-test-dependency': testDependency,
  'my-test-depencency2': testDependency2
}
