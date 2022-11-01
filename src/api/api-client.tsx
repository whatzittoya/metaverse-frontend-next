import axios, { AxiosResponse } from "axios";

export const endpoint = process.env.REACT_APP_SERVICE_URI
  ? process.env.REACT_APP_SERVICE_URI
  : "http://127.0.0.1:1337/";

const apiToken = "3zcyEf6UumUDAk3op9pZLzay6YCPHrQt";

export function getCategoriesRequest() {
  return fetch(`${endpoint}items/category`);
}

export function getCategoryInfo(categoryId: string) {
  return fetch(
    `${endpoint}items/object?fields=id,name,width,height,image,category.name&filter[category][id]=${categoryId}`
  );
}

export async function getWindow() {
  return await (
    await fetch(
      `${endpoint}items/object?fields=id,name,width,height,image,category.name&filter[category][name]=window`
    )
  ).json();
}

export async function getDoor() {
  return await (
    await fetch(
      `${endpoint}items/object?fields=id,name,width,height,image,category.name&filter[category][name]=door`
    )
  ).json();
}

export async function addDesign<T>(data) {
  //transform data
  const transfDataFloor = data.floors.map((floor) => {
    if ("furnitureArray" in floor) {
      floor.object = floor.furnitureArray;
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
  const transfData = { ...data, ...transfDataFloor[0] };
  const headers = {
    Authorization: `bearer ${apiToken}`,
  };
  const url = `${endpoint}items/design/`;
  const r = await axios.post(url, transfData, {
    headers,
  });
  return r.status;
  // const response = await fetch(url, {
  //   method: "POST", // *GET, POST, PUT, DELETE, etc.
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorize: `Bearer ${apiToken}`,
  //   },
  //   body: JSON.stringify(transfData),
  // });
  // return response.json();
}
