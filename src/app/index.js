const path = require("path");

const Koa = require("koa");
const KoaBody = require("koa-body");
const koaStatic = require("koa-static");
const parameter = require("koa-parameter");
const { router } = require("../router");

const errHandle = require("./errorHandle");
const app = new Koa({});

app.use(
  KoaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "../uploads"),
      keepExtensions: true,
    },
  })
);

app.use(koaStatic(path.join(__dirname, "../uploads")));
app.use(parameter(app));
app.use(router.routes()).use(router.allowedMethods());

// 统一的错误处理
app.on("error", errHandle);
module.exports = app;
