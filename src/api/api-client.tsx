import axios, { AxiosResponse } from "axios";
import { AxisX } from "tabler-icons-react";
import { transformForSave } from "../helpers/TransformData";

export const endpoint = process.env.NEXT_PUBLIC_API
  ? process.env.NEXT_PUBLIC_API
  : "http://127.0.0.1:1337/";

const apiToken = process.env.NEXT_PUBLIC_TOKEN
  ? process.env.NEXT_PUBLIC_TOKEN
  : "3zcyEf6UumUDAk3op9pZLzay6YCPHrQt";

const headers = {
  Authorization: `bearer ${apiToken}`,
};

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
  const transfData = transformForSave(data);
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

export async function getDesign(id) {
  const res = await axios.get(
    `${endpoint}items/design/${id}?fields=name,id,object.*,object.object_id.image,wall.*`,
    { headers }
  );
  const data = res.data;
  data.floors = [data.data];
  delete data.data;
  (data.floors[0].furnitureArray = data.floors[0].object).map((obj) => {
    obj.texturePath = obj.object_id.image;
    obj.attachedToLeft = obj.attachedtoleft;
    obj.attachedToRight = obj.attachedtoright;
    delete obj.attachedtoleft;
    delete obj.attachedtoright;
    delete obj.object_id;
    return obj;
  });
  data.floors[0].wallNodes = data.floors[0].wall.map((wall) => ({
    id: wall.id_onload,
    x: wall.x,
    y: wall.y,
  }));

  data.floors[0].wallNodeLinks = data.floors[0].wall.map((wall) => [
    wall.id_onload,
    wall.link,
  ]);

  delete data.floors[0].wall;
  delete data.floors[0].object;
  data.furnitureId = data.floors[0].furnitureArray.length;
  data.wallNodeId = data.floors[0].wallNodes.length;
  console.log(data);
  return data;
  return {
    floors: [
      {
        furnitureArray: [
          {
            x: 122.49645344567557,
            y: 0,
            object_id: 2,
            height: 0.15,
            width: 1,
            zIndex: 0,
            id: 1,
            texturePath: "fce1631f-9f02-451d-a522-07067a883da5",
            rotation: 0,
            orientation: 0,
            attachedtoleft: 1,
            attachedtoright: 2,
          },
        ],
        wallNodes: [
          {
            id: 1,
            x: 2070,
            y: 2050,
          },
          {
            id: 2,
            x: 2820,
            y: 2030,
          },
          {
            id: 3,
            x: 2780,
            y: 2420,
          },
          {
            id: 4,
            x: 1920,
            y: 2430,
          },
        ],
        wallNodeLinks: [
          [1, [2, 4]],
          [2, [3]],
          [3, [4]],
          [4, []],
        ],
      },
    ],
    name: "My Design 2022-11-02T08:56:34.397Z",
    status: "Published",
    furnitureId: 1,
    wallNodeId: 4,
  };
}
