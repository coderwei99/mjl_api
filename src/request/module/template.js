const TripRequest = require("../request");
const axios = require("axios")
const {
  appid,
  secret,
  touser,
  template_id,
  url,
  datas
} = require("../../consitant/wxTemplateData");

// 获取模板消息的access_token
function getAccessToken() {
  return TripRequest.get({
    url: `cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
  })
}

// 进行消息推送


function postSendTemplate(access_token) {

  // 1.
  axios.post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`, {
    touser,
    template_id,
    url,
    data: datas
  })
    .then(res => {
      console.log('res', res)
    })
    .catch(function (error) {
      console.log('error===============', error);
    });
  // 2.
  // return TripRequest.post({
  //   // url: `cgi-bin/message/template/send?access_token=61_vxw5THRM6yR_xc-z3SZs64RyZ41FkdZP_Ncha351bCBDoY5GirBZrueGrFXp3Y8h8W0rIznnKfEXswlna5B9nf-1XqYaNq-g9bdblbsMkjtyUBXVqOE-NbWXgRjzD8lKiSzOe7u0MMNblgmrPNBbACAJHV`,
  //   url: `cgi-bin/message/template/send?access_token=${access_token}`,
  //   data: {
  //     touser,
  //     template_id,
  //     url,
  //     data: datas
  //   },
  // })
}


module.exports = {
  getAccessToken,
  postSendTemplate
}