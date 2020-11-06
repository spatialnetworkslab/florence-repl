export default function (iifeString) {
  return `export default ${parseString(iifeString)}`
}

function parseString (iifeString) {
  iifeString = removeStart(iifeString)
  iifeString = removeEnd(iifeString)

  return iifeString + '()'
}

function removeStart (iifeString) {
  const splitStr = iifeString.split('=factory())}(this,')

  if (splitStr.length === 2) return splitStr[1]

  return splitStr.slice(1, splitStr.length).join('=factory())}(this,')
}

function removeEnd (iifeString) {
  return iifeString.substring(0, iifeString.length - 3)
}
