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
      url: '',
      getCodeBody (code) { return code.substring(0, code.length - 16) },
      defaultExport: false,
      exportsObject: {
        y: 'y',
        z: 'z'
      }
    }

    const expectedResult = {
      name: 'some-package',
      defaultExport: false,
      exportsObject: { y: 'y', z: 'z' },
      iife: '(function() {\n' +
        'function x() { return \'bla\' }\n' +
        'function y() { return x() }\n' +
        'function z() { return 123 }\n' +
        'return { y: y, z: z }\n' +
        '})();',
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
      url: '',
      getCodeBody (code) { return code.substring(0, code.length - 22) },
      defaultExport: false,
      exportsObject: {
        y1: 'y',
        z: 'z'
      }
    }

    const expectedResult = {
      name: 'some-package',
      defaultExport: false,
      exportsObject: { y1: 'y', z: 'z' },
      iife: '(function() {\n' +
        'function x() { return \'bla\' }\n' +
        'function y() { return x() }\n' +
        'function z() { return 123 }\n' +
        'return { y1: y, z: z }\n' +
        '})();',
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
      url: '',
      getCodeBody (code) { return code.substring(0, code.length - 17) },
      defaultExport: true,
      defaultName: 'y'
    }

    const expectedResult = {
      name: 'some-package',
      defaultExport: true,
      defaultName: 'y',
      iife: '(function() {\n' +
        'function x() { return \'bla\' }\n' +
        'function y() { return x() }\n' +
        'return { y: y }\n' +
        '})();',
      dummyCode: '/* @@START_DUMMY_CODE_some-package@@ */\n' +
        'const y = \'y\'\n' +
        'export default y\n' +
        '/* @@END_DUMMY_CODE_some-package@@ */'
    }

    expect(parseCode(minifiedCode, packageMetadata)).toEqual(expectedResult)
  })
})
