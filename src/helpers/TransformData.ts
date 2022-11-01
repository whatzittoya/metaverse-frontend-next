export function transformData(res) {
  const res_map = res.data.map((elem) => {
    if ("image" in elem) {
      elem.imagePath = elem.image;
      delete elem.image;
    }
    if ("id" in elem) {
      elem._id = elem.id;
      delete elem.id;
    }

    return elem;
  });
  return res_map;
}
