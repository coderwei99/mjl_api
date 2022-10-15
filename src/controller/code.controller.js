const crypto = require('crypto')
const {
  create,
  verification,
  findCodeList
} = require("../server/code.server")

const {
  verifyCodeError,
  repetitionCodeError
} = require("../consitant/error/code.type")

class CodeController {
  // 创建邀请码
  async createCode(ctx, next) {
    const { shop_name } = ctx.request.body
    const hash = crypto.createHash('md5')
    const code = hash.update(Buffer.from(shop_name)).digest('hex').toLocaleUpperCase()

    const result = await create(code, shop_name)
    if (result == 'error') return ctx.app.emit("error", repetitionCodeError, ctx)
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
    if (!res || !res.is_valid) return ctx.app.emit('error', verifyCodeError, ctx)
    ctx.body = {
      code: 200,
      data: res,
      message: "邀请码正确"
    }
  }

  // 获取邀请码列表
  async getCodeList(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    const res = await findCodeList({ pageNum, pageSize })
    ctx.body = {
      code: 200,
      data: res,
      message: "获取邀请码列表"
    }
  }
}

module.exports = new CodeController();
