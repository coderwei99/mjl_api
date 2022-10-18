const { Op } = require("sequelize");
function handleLike(obj) {
  const { createdAt, updatedAt, is_hot, parent_id, ...info } = obj;
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
