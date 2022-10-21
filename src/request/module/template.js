const TripRequest = require("../request");
const axios = require("axios");
const {
  appid,
  secret,
  touser,
  template_id,
  url,
} = require("../../consitant/wxTemplateData");

// 获取模板消息的access_token
function getAccessToken() {
  return TripRequest.get({
    url: `cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
  });
}

// 进行消息推送

async function postSendTemplate(access_token, data) {
  // 1.
  const res = await axios.post(
    `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`,
    {
      touser,
      template_id,
      url,
      data,
      // "miniprogram": {
      //   "appid": "wx65550dc45bb78a1f",
      //   "pagepath": "index"
      // },
    }
  );
  if (res.data.errcode == 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getAccessToken,
  postSendTemplate,
};
