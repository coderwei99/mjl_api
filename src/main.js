const app = require("./app");

const { APP_POST } = require("./config/config.default");

app.listen(APP_POST, () => {
  console.log(`server is running on http://localhost:${APP_POST}`);
});
