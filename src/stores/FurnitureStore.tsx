import create from "zustand";
import { getCategoriesRequest, getCategoryInfo } from "../api/api-client";
import { transformData } from "../helpers/TransformData";

export interface Category {
  _id: string;
  name: string;
  visible: boolean;
}

export interface FurnitureData {
  _id?: string;
  name?: string;
  description?: string;
  width: number;
  height: number;
  imagePath: string;
  category?: any;
  zIndex?: number;
}

export interface FurnitureStore {
  categories: Category[];
  currentFurnitureData: FurnitureData[];
  getCategories: () => void;
  getCurrentFurnitureData: (categoryId: string) => void;
}

export const useFurnitureStore = create<FurnitureStore>((set) => ({
  categories: [],
  currentFurnitureData: [],
  getCategories: async () => {
    let res = await (await getCategoriesRequest()).json();

    set(() => ({
      categories: transformData(res),
    }));
  },
  getCurrentFurnitureData: async (categoryId: string) => {
    let res = await (await getCategoryInfo(categoryId)).json();

    set(() => ({
      currentFurnitureData: transformData(res),
    }));
  },
}));
