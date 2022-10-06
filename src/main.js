const app = require("./app");

const { APP_POST } = require("./config/config.default");

console.log('app_post', APP_POST);
app.listen(5050, () => {
  console.log(`server is running on http://localhost:5050`);
});
