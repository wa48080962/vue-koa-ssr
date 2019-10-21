const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render')

// const router = require('express').Router()
// const VueServerRenderer = require('vue-server-renderer')
// const path = require('path')
// const fs = require('fs')

// const serverRender = require('./server-render')
const clientManifest = require('../../public/vue-ssr-client-manifest.json')
const bundle = path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json')
const renderer = VueServerRenderer.createBundleRenderer(
  bundle,
  {
    // runInNewContext: false,
    inject: false,
    clientManifest
  }
)

const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

const router = new Router()

router.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = router
