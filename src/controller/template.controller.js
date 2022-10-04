const { getAccessToken, postSendTemplate } = require('../request/module/template')

class Template {
  async sendTemplate(ctx) {
    const { access_token } = await getAccessToken()
    const res = await postSendTemplate(access_token)
    console.log('res', res);
    ctx.body = {
      code: 200,
      message: "通知商家成功"
    }
  }
}

module.exports = new Template();
