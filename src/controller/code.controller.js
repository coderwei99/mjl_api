const crypto = require('crypto')
const {
  create,
  verification
} = require("../server/code.server")

const { verifyCodeError } = require("../consitant/error/code.type")

class CodeController {
  // 创建邀请码
  async createCode(ctx, next) {
    const { shop_name } = ctx.request.body
    const hash = crypto.createHash('md5')
    const code = hash.update(Buffer.from(shop_name)).digest('hex').toLocaleUpperCase()

    const result = await create(code, shop_name)

    ctx.body = {
      code: 200,
      data: result,
      message: "创建邀请码成功"
    }
  }

  // 验证邀请码
  async verificationCode(ctx) {
    const code = ctx.request.query.code
    const res = await verification(code)
    console.log(code);
    if (!res) return ctx.app.emit('error', verifyCodeError, ctx)
    ctx.body = {
      code: 200,
      data: res,
      message: "邀请码正确"
    }
  }
}

module.exports = new CodeController();
