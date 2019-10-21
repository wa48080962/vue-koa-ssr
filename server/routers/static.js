const Router = require('koa-router')
const send = require('koa-send')

const staticRouter = new Router({ prefix: '/public' })

staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
// const router = require('express').Router()
// const path = require('path')

// router.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../../public', req.path))
// })

// module.exports = router
