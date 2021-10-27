const Address = require("../model/address_model");

class AddressServer {
  async create({ consignee, phone, address, user_id }) {
    const res = await Address.create({
      user_id,
      consignee,
      phone,
      address,
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
        "address",
        "is_default",
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
}

module.exports = new AddressServer();