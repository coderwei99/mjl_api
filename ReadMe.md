# 基于 node+Koa+mysql 实现商城 API 接口

## 实现功能

##### 用户管理

1. 用户注册
2. 用户登录
3. 修改密码

##### 商品管理

1. 上传图片
2. 发布商品
3. 更新商品
4. 下架商品
5. 上架商品
6. 查询商品列表

##### 购物车管理

1. 加入购物车
2. 查询购物车商品
3. 更新购物车商品
4. 删除购物车商品

##### 用户地址管理

1. 添加地址
2. 获取地址列表
3. 删除地址
4. 设置默认地址

##### 订单管理

1. 创建订单
2. 获取订单列表
3. 更新订单

## 错误类型(五位数)
1. 第一位表示前端还是后端错误
2. 第二位、第三位表示模块
3. 第四位、第五位具体错误编号 详情见consitant/error文件
### 模块

| 编号 | 对应模块 |
| ---- | -------- |
| 10   | 用户     |
| 11   | 商品     |
| 12   | 购物车   |
| 13   | 订单     |
| 14   | 地址     |
| 15   | 分类     |

### 例子

- 10001：表示前端用户模块错误，具体编号01
- 20001：表示后端用户模块错误，具体编号01
