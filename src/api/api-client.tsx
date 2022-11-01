import axios, { AxiosResponse } from "axios";
import { transformForSave } from "../helpers/TransformData";

export const endpoint = process.env.NEXT_PUBLIC_API
  ? process.env.NEXT_PUBLIC_API
  : "http://127.0.0.1:1337/";

const apiToken = process.env.NEXT_PUBLIC_TOKEN
  ? process.env.NEXT_PUBLIC_TOKEN
  : "3zcyEf6UumUDAk3op9pZLzay6YCPHrQt";

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

export function getDesign() {
  return {
    floors: [
      {
        furnitureArray: [
          {
            x: 2140,
            y: 2460,
            height: 0.8000000000000002,
            width: 0.4,
            zIndex: 0,
            id: 1,
            texturePath: "1d9c1279-e5b0-4c59-aab7-c1fc3aaf6927",
            rotation: 1.5629697913328724,
            orientation: 0,
          },
          {
            x: 2210,
            y: 2330,
            height: 0.8,
            width: 0.4,
            zIndex: 0,
            id: 2,
            texturePath: "dd69e84d-eb9e-4d9a-a879-bd14bab29304",
            rotation: 0,
            orientation: 0,
          },
          {
            x: 2170,
            y: 2330,
            height: 0.8,
            width: 0.4,
            zIndex: 0,
            id: 3,
            texturePath: "dd69e84d-eb9e-4d9a-a879-bd14bab29304",
            rotation: 0,
            orientation: 0,
          },
          {
            x: 2060,
            y: 2330,
            height: 0.8,
            width: 0.4,
            zIndex: 0,
            id: 6,
            texturePath: "dd69e84d-eb9e-4d9a-a879-bd14bab29304",
            rotation: 0,
            orientation: 0,
          },
        ],
        wallNodes: [
          { id: 1, x: 2050, y: 2320 },
          { id: 2, x: 2270, y: 2320 },
          { id: 3, x: 2270, y: 2500 },
          { id: 4, x: 2040, y: 2510 },
        ],
        wallNodeLinks: [
          [1, [2, 4]],
          [2, [3]],
          [3, [4]],
          [4, []],
        ],
      },
    ],
    furnitureId: 6,
    wallNodeId: 4,
  };
}
