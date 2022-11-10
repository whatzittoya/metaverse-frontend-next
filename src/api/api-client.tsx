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

export async function getPeople() {
  return await (
    await fetch(
      `${endpoint}items/object?fields=id,name,width,height,image,category.name&filter[category][name]=person`
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

export async function addDesign<T>(data, blob) {
  //transform data

  const headers_multi = {
    Authorization: `bearer ${apiToken}`,
    "Content-Type": "multipart/form-data",
  };

  const formData = new FormData();

  // const base64Response = await fetch(image);
  // const blob = await base64Response.blob();
  formData.append("title", "layout");
  formData.append("file", blob);
  const upload = await axios.post(`${endpoint}files`, formData, {
    headers: headers_multi,
  });
  data.image = upload.data.data.id;
  const transfData = transformForSave(data);
  //console.log(transfData);
  const url = `${endpoint}items/design/`;
  const r = await axios.post(url, transfData, {
    headers,
  });

  return r.status;
}

export async function getDesign(id) {
  const res = await axios.get(
    `${endpoint}items/design/${id}?fields=name,id,object.*,object.object_id.id,object.object_id.name,object.object_id.image,object.object_id.category.name,wall.*`,
    { headers }
  );
  const data = res.data;
  data.floors = [data.data];
  delete data.data;
  (data.floors[0].furnitureArray = data.floors[0].object).map((obj) => {
    obj.texturePath = obj.object_id.image;
    obj.name = obj.object_id.name;
    obj.category = obj.object_id.category.name;
    obj.attachedToLeft = obj.attachedtoleft;
    obj.attachedToRight = obj.attachedtoright;
    delete obj.attachedtoleft;
    delete obj.attachedtoright;
    obj.object_id = obj.object_id.id;
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
  return data;
}
