const Koa = require("koa");

const { APP_POST } = require("./config/config.default");

const app = new Koa();

app.use((cts, next) => {
  cts.body = "hello api11asdasdsa";
});

app.listen(APP_POST, () => {
  console.log(`server is running on http://localhost:${APP_POST}`);
});
