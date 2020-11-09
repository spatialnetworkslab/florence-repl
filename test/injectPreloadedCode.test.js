import injectPreloadedCode from '../src/preload/injectPreloadedCode.js'

describe('injectPreloadedCode', () => {
  it('works with packages with exports object (export { y, z })', () => {
    const bundled = '// Code before\n' +
      '/* @@START_DUMMY_CODE_some-package@@ */\n' +
      'const y = \'y\';\n' +
      'const z = \'z\';\n' +
      '/* @@END_DUMMY_CODE_some-package@@ */\n' +
      '// Code after'

    const packageMetadata = {
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

    const expectedResult = '// Code before\n' +
    'const { y: y, z: z } = (function() {\n' +
    'function x() { return \'bla\' }\n' +
    'function y() { return x() }\n' +
    'function z() { return 123 }\n' +
    'return { y: y, z: z }\n' +
    '})()\n' +
    '// Code after'

    expect(injectPreloadedCode(bundled, packageMetadata)).toBe(expectedResult)
  })

  it('works with packages with exports object where compiler changes names', () => {
    const bundled = '// Code before\n' +
      '/* @@START_DUMMY_CODE_some-package@@ */\n' +
      'const y123 = \'y\';\n' +
      'const z456 = \'z\';\n' +
      '/* @@END_DUMMY_CODE_some-package@@ */\n' +
      '// Code after'

    const packageMetadata = {
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

    const expectedResult = '// Code before\n' +
    'const { y: y123, z: z456 } = (function() {\n' +
    'function x() { return \'bla\' }\n' +
    'function y() { return x() }\n' +
    'function z() { return 123 }\n' +
    'return { y: y, z: z }\n' +
    '})()\n' +
    '// Code after'

    expect(injectPreloadedCode(bundled, packageMetadata)).toBe(expectedResult)
  })

  it('works with packages with default export', () => {
    const bundled = '// Code before\n' +
    '/* @@START_DUMMY_CODE_some-package@@ */\n' +
    'const y = \'y\';\n' +
    '/* @@END_DUMMY_CODE_some-package@@ */\n' +
    '// Code after'

    const packageMetadata = {
      name: 'some-package',
      url: '',
      exportValue: 'default y',
      iife: '(function() {\n' +
        'function x() { return \'bla\' }\n' +
        'function y() { return x() }\n' +
        'return { y: y }\n' +
        '})()',
      dummyCode: '/* @@START_DUMMY_CODE_some-package@@ */\n' +
        'export default const y = \'y\'\n' +
        '/* @@END_DUMMY_CODE_some-package@@ */'
    }

    const expectedResult = '// Code before\n' +
    'const { y: y } = (function() {\n' +
    'function x() { return \'bla\' }\n' +
    'function y() { return x() }\n' +
    'return { y: y }\n' +
    '})()\n' +
    '// Code after'

    expect(injectPreloadedCode(bundled, packageMetadata)).toBe(expectedResult)
  })

  it('works with packages with default export where compiler changes name', () => {
    const bundled = '// Code before\n' +
    '/* @@START_DUMMY_CODE_some-package@@ */\n' +
    'const y123 = \'y\';\n' +
    '/* @@END_DUMMY_CODE_some-package@@ */\n' +
    '// Code after'

    const packageMetadata = {
      name: 'some-package',
      url: '',
      exportValue: 'default y',
      iife: '(function() {\n' +
        'function x() { return \'bla\' }\n' +
        'function y() { return x() }\n' +
        'return { y: y }\n' +
        '})()',
      dummyCode: '/* @@START_DUMMY_CODE_some-package@@ */\n' +
        'export default const y = \'y\'\n' +
        '/* @@END_DUMMY_CODE_some-package@@ */'
    }

    const expectedResult = '// Code before\n' +
    'const { y: y123 } = (function() {\n' +
    'function x() { return \'bla\' }\n' +
    'function y() { return x() }\n' +
    'return { y: y }\n' +
    '})()\n' +
    '// Code after'

    expect(injectPreloadedCode(bundled, packageMetadata)).toBe(expectedResult)
  })
})
