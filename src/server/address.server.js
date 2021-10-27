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
}

module.exports = new AddressServer();
