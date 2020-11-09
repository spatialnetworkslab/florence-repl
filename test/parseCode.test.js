import parseCode from '../src/preload/parseCode.js'

describe('parseCode', () => {
  it('parses esm packages (exports object)', () => {
    const minifiedCode = 'function x() { return \'bla\' }\n' +
      'function y() { return x() }\n' +
      'function z() { return 123 }\n' +
      '\n' +
      'export { y, z }'

    const packageMetadata = {
      name: 'some-package',
      url: '',
      format: 'esm'
    }

    const expectedResult = {
      name: 'some-package',
      url: '',
      format: 'esm',
      exportValue: '{ y, z }',
      exportsObject: { y: 'y', z: 'z' },
      iife: '(function() {\n' +
        'function x() { return \'bla\' }\n' +
        'function y() { return x() }\n' +
        'function z() { return 123 }\n' +
        'return { y: y, z: z }\n' +
        '})()',
      dummyCode: '/* @@START_DUMMY_CODE_some-package@@ */\n' +
      'export const y = \'y\'\n' +
      'export const z = \'z\'\n' +
      '/* @@END_DUMMY_CODE_some-package@@ */'
    }

    expect(parseCode(minifiedCode, packageMetadata)).toEqual(expectedResult)
  })

  it('parses esm packages (exports object using { a as b } syntax)', () => {
    const minifiedCode = 'function x() { return \'bla\' }\n' +
      'function y() { return x() }\n' +
      'function z() { return 123 }\n' +
      '\n' +
      'export { y as y1, z }'

    const packageMetadata = {
      name: 'some-package',
      url: '',
      format: 'esm'
    }

    const expectedResult = {
      name: 'some-package',
      url: '',
      format: 'esm',
      exportValue: '{ y as y1, z }',
      exportsObject: { y1: 'y', z: 'z' },
      iife: '(function() {\n' +
        'function x() { return \'bla\' }\n' +
        'function y() { return x() }\n' +
        'function z() { return 123 }\n' +
        'return { y1: y, z: z }\n' +
        '})()',
      dummyCode: '/* @@START_DUMMY_CODE_some-package@@ */\n' +
      'export const y1 = \'y1\'\n' +
      'export const z = \'z\'\n' +
      '/* @@END_DUMMY_CODE_some-package@@ */'
    }

    expect(parseCode(minifiedCode, packageMetadata)).toEqual(expectedResult)
  })

  it('parses esm packages (default export)', () => {
    const minifiedCode = 'function x() { return \'bla\' }\n' +
      'function y() { return x() }\n' +
      '\n' +
      'export default y'

    const packageMetadata = {
      name: 'some-package',
      url: '',
      format: 'esm'
    }

    const expectedResult = {
      name: 'some-package',
      url: '',
      format: 'esm',
      exportValue: 'default y',
      iife: '(function() {\n' +
        'function x() { return \'bla\' }\n' +
        'function y() { return x() }\n' +
        'return y\n' +
        '})()',
      dummyCode: '/* @@START_DUMMY_CODE_some-package@@ */\n' +
        'export default const y = \'y\'\n' +
        '/* @@END_DUMMY_CODE_some-package@@ */'
    }

    expect(parseCode(minifiedCode, packageMetadata)).toEqual(expectedResult)
  })
})
