const Router = require("koa-router");

const router = new Router({ prefix: "/address" });

const {
  createAddress,
  findAddressList,
  updataAddress,
  removeAddress,
  setDeaultAddress,
} = require("../controller/address.controller");

// 导入所需的中间件
const { diffChannelNo } = require("../middleware/auth.middleware");
const { addressFarmat } = require("../middleware/address.middleware");

// 添加地址
router.post(
  "/",
  diffChannelNo,
  addressFarmat({
    consignee: "string",
    phone: { type: "string", format: /^1\d{10}$/ },
  }),
  createAddress
);

// 获取地址列表
router.get("/", diffChannelNo, findAddressList);

// 更新地址
router.put(
  "/:id",
  diffChannelNo,
  addressFarmat({
    consignee: "string",
    phone: { type: "string", format: /^1\d{10}$/ },
    address: "string",
  }),
  updataAddress
);

// 删除地址
router.delete("/:id", diffChannelNo, removeAddress);

// 设置地址为默认地址
router.patch("/:id", diffChannelNo, setDeaultAddress);
module.exports = router;
