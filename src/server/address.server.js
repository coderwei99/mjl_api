const Address = require("../model/address_model");

class AddressServer {
  async create({
    user_id,
    consignee,
    phone,
    district,
    city,
    province,
    detail,
    post_code,
    is_default,
    city_province,
  }) {
    district = JSON.stringify(district);
    city = JSON.stringify(city);
    province = JSON.stringify(province);
    const res = await Address.create({
      user_id,
      consignee,
      phone,
      district,
      city,
      province,
      detail,
      post_code,
      is_default,
      city_province,
    });
    return res ? res : null;
  }

  async findAll(user_id) {
    const { count, rows } = await Address.findAndCountAll({
      where: {
        user_id,
      },
      attributes: [
        "id",
        "user_id",
        "consignee",
        "phone",
        "district",
        "city",
        "province",
        "detail",
        "post_code",
        "is_default",
        "city_province",
      ],
    });
    return {
      count,
      rows,
    };
  }

  async updata(params, id, user_id) {
    const res = await Address.update(params, {
      where: {
        id,
        user_id,
      },
    });
    return res[0] > 0 ? res : false;
  }

  async remove({ address_id, user_id }) {
    const res = await Address.destroy({
      where: {
        id: address_id,
      },
    });
    return res;
  }

  async setDeafultAction({ address_id, user_id }) {
    await Address.update(
      {
        is_default: false,
      },
      {
        where: {
          user_id,
        },
      }
    );
    console.log(address_id);
    return await Address.update(
      {
        is_default: true,
      },
      {
        where: {
          id: address_id.id,
        },
      }
    );
  }

  async findDefaultAddress(user_id) {
    let res = await Address.findOne({
      where: {
        user_id,
        is_default: true,
      },
      raw: true,
    });
    console.log(res, "findDefaultAddressres");
    // 如果用户没有默认地址 就随便找个地址给他
    if (!res) {
      res = await Address.findOne({
        where: {
          user_id,
        },
        raw: true,
      });
    }
    return res;
  }
}

module.exports = new AddressServer();
