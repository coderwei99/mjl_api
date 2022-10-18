const { Op } = require("sequelize");
function handleLike(obj) {
  const { createdAt, updatedAt, is_hot, parent_id, is_used, ...info } = obj;
  let keys = Reflect.ownKeys(info);
  let where = {};
  keys.forEach(item => {
    where[item] = {
      [Op.like]: `%${info[item]}%`,
    };
  });
  if (is_hot !== undefined) {
    where["is_hot"] = is_hot;
  }
  if (parent_id) {
    where["parent_id"] = parent_id;
  }
  if (is_used) {
    where["is_used"] = is_used;
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
