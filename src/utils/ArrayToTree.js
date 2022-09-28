function transArray(arr, parent_id = 0) {
  // console.log(arr, '-----------arr---------------');
  //  循环遍历
  let newArr = []  //  专门收集转化后的数组
  console.log(arr);
  // arr.forEach((item) => {
  //   //  1-先要找第一层
  //   if (item.parent_id === parent_id) {
  //     //  3-收集非一级
  //     let child = transArray(arr, item.id)  //  递归：函数内部调用函数
  //     if (child.length) {
  //       //  有长度表示可以收集到二级
  //       item.children = child
  //     }
  //     // console.log(child);
  //     //2-收集筛选出来的一级
  //     newArr.push(item)
  //   }
  // })
  // return newArr
}

module.exports = {
  transArray
}