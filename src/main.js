const Koa = require("koa");

const app = new Koa();

app.use((cts, next) => {
  cts.body = "hello api";
});
app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
