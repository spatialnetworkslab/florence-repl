import parseCode from '../src/preload/parseCode.js'

describe('parseCode', () => {
  it('parses packages with exports object (export { y, z })', () => {
    const minifiedCode = 'function x() { return \'bla\' }\n' +
      'function y() { return x() }\n' +
      'function z() { return 123 }\n' +
      '\n' +
      'export { y, z }'

    const packageMetadata = {
      name: 'some-package',
      url: ''
    }

    const expectedResult = {
      name: 'some-package',
      url: '',
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

  it('parses packages with exports object using { a as b } syntax', () => {
    const minifiedCode = 'function x() { return \'bla\' }\n' +
      'function y() { return x() }\n' +
      'function z() { return 123 }\n' +
      '\n' +
      'export { y as y1, z }'

    const packageMetadata = {
      name: 'some-package',
      url: ''
    }

    const expectedResult = {
      name: 'some-package',
      url: '',
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

  it('parses packages with default export', () => {
    const minifiedCode = 'function x() { return \'bla\' }\n' +
      'function y() { return x() }\n' +
      '\n' +
      'export default y'

    const packageMetadata = {
      name: 'some-package',
      url: ''
    }

    const expectedResult = {
      name: 'some-package',
      url: '',
      exportValue: 'default y',
      iife: '(function() {\n' +
        'function x() { return \'bla\' }\n' +
        'function y() { return x() }\n' +
        'return { y: y }\n' +
        '})()',
      dummyCode: '/* @@START_DUMMY_CODE_some-package@@ */\n' +
        'export default y = \'y\'\n' +
        '/* @@END_DUMMY_CODE_some-package@@ */'
    }

    expect(parseCode(minifiedCode, packageMetadata)).toEqual(expectedResult)
  })
})
