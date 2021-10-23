const Koa = require("koa");
const app = new Koa();

const { APP_POST } = require("./config/config.default");
const userRouter = require("./router/user.route");

app.use(userRouter.routes());

app.listen(APP_POST, () => {
  console.log(`server is running on http://localhost:${APP_POST}`);
});
