const { Op } = require("sequelize");
function handleLike(obj) {
  let {
    createdAt,
    updatedAt,
    is_hot,
    parent_id,
    is_used,
    status,
    sale_or_not,
    ...info
  } = obj;
  let keys = Reflect.ownKeys(info);
  let where = {};
  keys.forEach(item => {
    where[item] = {
      [Op.like]: `%${info[item]}%`,
    };
  });
  if (sale_or_not == 2) {
    where["deletedAt"] = {
      [Op.not]: null,
    };
  }

  if (sale_or_not == 1) {
    where["deletedAt"] = {
      [Op.is]: null,
    };
  }

  if (is_hot !== undefined) {
    where["is_hot"] = is_hot;
  }
  if (parent_id) {
    where["parent_id"] = parent_id;
  }
  if (is_used !== undefined) {
    where["is_used"] = is_used;
  }
  if (status) {
    where["status"] = status;
  }
  if (createdAt) {
    where["createdAt"] = {
      [Op.between]: createdAt,
    };
  }
  if (updatedAt) {
    where["updatedAt"] = {
      [Op.between]: updatedAt,
    };
  }
  return where;
}

module.exports = {
  handleLike,
};
