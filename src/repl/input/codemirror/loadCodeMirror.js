import createCodeMirror from './package/lib/codemirror.js'
import './codemirror.css'

// import './package/mode/shell/shell.js'

// mode dependencies
import addSimple from './package/addon/mode/simple.js'
import addMultiplex from './package/addon/mode/multiplex.js'

// modes
import addJavascript from './package/mode/javascript/javascript.js'
import addHandleBars from './package/mode/handlebars/handlebars.js'
import addHtmlMixed from './package/mode/htmlmixed/htmlmixed.js'
import addXML from './package/mode/xml/xml.js'
import addCSS from './package/mode/css/css.js'
import addMarkdown from './package/mode/markdown/markdown.js'

// addons
import addCloseBrackets from './package/addon/edit/closebrackets.js'
import addCloseTag from './package/addon/edit/closetag.js'
import addContinueList from './package/addon/edit/continuelist.js'
import addComment from './package/addon/comment/comment.js'

function loadCodeMirror () {
  const CodeMirror = createCodeMirror()

  // mode dependencies
  addSimple(CodeMirror)
  addMultiplex(CodeMirror)

  // modes
  addJavascript(CodeMirror)
  addHandleBars(CodeMirror)
  addHtmlMixed(CodeMirror)
  addXML(CodeMirror)
  addCSS(CodeMirror)
  addMarkdown(CodeMirror)

  // addons
  addCloseBrackets(CodeMirror)
  addCloseTag(CodeMirror)
  addContinueList(CodeMirror)
  addComment(CodeMirror)

  return CodeMirror
}

export default loadCodeMirror
