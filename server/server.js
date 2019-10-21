const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
// const express = require('express')

const staticRouter = require('./routers/static')
const app = new Koa()
// const app = express()
const isDev = process.env.NODE_ENV === 'development'

// 处理报错信息
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter

if (isDev) {
  pageRouter = require('./routers/dev.ssr.js')
} else {
  pageRouter = require('./routers/ssr.js')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})

// app.use((req, res, next) => {
//   try {
//     console.log(`request with path: ${req.path}`)
//     next()
//   } catch (err) {
//     console.error(err)
//     res.status = 500
//     if (isDev) {
//       res.send(err.message)
//     } else {
//       res.send('please try later')
//     }
//   }
// })

// app.use((req, res, next) => {
//   if (req.path === '/favicon.ico') {
//     res.sendFile(path.join(__dirname, '../favicon.ico'))
//   } else {
//     next()
//   }
// })

// const pageRouter = isDev ? require('./routers/dev-ssr') : require('./routers/ssr')
// const staticRouter = require('./routers/static')
// app.use('/public', staticRouter)
// // app.use(app.router)
// // staticRouter.initialize(app)
// app.use('*', pageRouter)

// const HOST = process.env.HOST || '0.0.0.0'
// const PORT = process.env.PORT || 3333

// app.listen(PORT, HOST, () => {
//   console.log(`server is listening on ${HOST}:${PORT}`)
// })
