const { Op } = require("sequelize");
function handleLike(obj) {
  const { createdAt, updatedAt, ...info } = obj;
  let keys = Reflect.ownKeys(info);
  let where = {};
  keys.forEach(item => {
    where[item] = {
      [Op.like]: `%${info[item]}%`,
    };
  });
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
