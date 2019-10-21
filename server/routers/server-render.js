const ejs = require('ejs')
const serialize = require('serialize-javascript')
module.exports = async (ctx, renderer, template) => {
//   function renderToString (context) {
//     return new Promise((resolve, reject) => {
//       renderer.renderToString(context, (err, html) => {
//         if (err) {
//           reject(err)
//           return
//         }
//         resolve(html)
//       })
//     })
//   }
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path }
  try {
    const appString = await renderer.renderToString(context)
    const { title } = context.meta.inject()
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
      initialState: serialize(context.state)
    })
    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
