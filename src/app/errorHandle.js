module.exports = (err, ctx) => {
  console.log("on");
  console.log("err", err);
  let status = 500;
  switch (err.code) {
    case "10001":
      status = 400;
      break;
    case "10002":
      status = 409;
      break;
    default:
      status = 200;
  }
  ctx.status = status;
  ctx.body = err;
};
