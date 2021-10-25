const fs = require("fs");

const Router = require("koa-router");
const router = new Router();
fs.readdirSync(__dirname).forEach((fild) => {
  // console.log(fild);
  if (fild !== "index.js") {
    let r = require("./" + fild);
    router.use(r.routes());
  }
});
module.exports = {
  router,
};
