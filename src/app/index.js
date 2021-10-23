const Koa = require("koa");
const KoaBody = require("koa-body");
const userRouter = require("../router/user.route");

const errHandle = require("./errorHandle");
const app = new Koa();

app.use(KoaBody());

app.use(userRouter.routes());

// 统一的错误处理
app.on("error", errHandle);
module.exports = app;
