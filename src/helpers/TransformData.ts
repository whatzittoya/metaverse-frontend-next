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

export function transformForSave(data) {
  if ("furnitureArray" in data.floors[0]) {
    const f = data.floors[0].furnitureArray;
    const person = f.find((obj) => obj.object_id === 16);
    data.person = person;
  }
  data.json = JSON.stringify(data);
  const transfDataFloor = data.floors.map((floor) => {
    if ("furnitureArray" in floor) {
      floor.object = floor.furnitureArray.map((fur) => {
        fur.attachedtoleft = fur.attachedToLeft;
        fur.attachedtoright = fur.attachedToRight;
        delete fur.attachedToLeft;
        delete fur.attachedToRight;
        return fur;
      });

      delete floor.furnitureArray;
    }
    if ("wallNodes" in floor) {
      floor.wall = floor.wallNodes;
      floor.wall = floor.wall.map((wall) => {
        if ("id" in wall) {
          wall.id_onload = wall.id;
          delete wall.id;

          //adding link
          wall.link = floor.wallNodeLinks.find(
            (f) => f[0] == wall.id_onload
          )[1];
          return wall;
        }
      });
      delete floor.wallNodes;
    }

    if ("wallNodeLinks" in floor) {
      delete floor.wallNodeLinks;
    }
    return floor;
  });
  delete data.floors;
  console.log(transfDataFloor[0]);
  return { ...data, ...transfDataFloor[0] };
}
