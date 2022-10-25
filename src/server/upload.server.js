const Uploads = require("../model/upload_model");
const findFileInfo = async id => {
  const res = await Uploads.findByPk(id, {
    raw: true,
  });
  console.log(res, "find file info res");
  return res;
};

const deleteImage = async id => {
  const res = await Uploads.destroy({
    where: {
      id,
    },
  });
  console.log(res, "delete file info res");
  return res ? true : false;
};
module.exports = { findFileInfo, deleteImage };

// 1. 前端给到url  后端拿着url删除图片 然后拿着这个url 去删除数据库的记录
// 2. 前端给到id  然后后端拿着这个id 去查询到url 然后再去删除实际的图片  然后再一次去数据库删除这条记录
