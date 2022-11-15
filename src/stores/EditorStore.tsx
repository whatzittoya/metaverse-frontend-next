/** handling current tool state, mainly */
import create from "zustand";
import { AddWallManager } from "../editor/editor/actions/AddWallManager";
import { Tool } from "../editor/editor/constants";

export enum ToolMode {
  FurnitureMode,
  WallMode,
  ViewMode,
}

export interface CurrentFurniture {
  id: number;
  name: String;
  description: string;
  api: string;
  interactable: string;
}

export interface EditorStore {
  mode: ToolMode;
  floor: number;
  activeTool: Tool;
  snap: boolean;
  furniture: CurrentFurniture;
  propPanel: boolean;
  setMode: (mode: ToolMode) => void;
  setTool: (tool: Tool) => void;
  setFloor: (floor: number) => void;
  setSnap: (snap: boolean) => void;
  setCurrentFurniture: (fur: CurrentFurniture) => void;
}

export const useStore = create<EditorStore>((set) => ({
  mode: ToolMode.FurnitureMode,
  activeTool: Tool.View,
  floor: 0,
  snap: true,
  furniture: {
    id: 0,
    name: "",
    description: "",
    api: "",
    interactable: "false",
  },
  propPanel: false,
  setMode: (mode: ToolMode) => {
    set(() => ({
      mode: mode,
    }));
  },
  setFloor: (floor: number) => {
    set(() => ({
      floor: floor,
    }));
  },
  setTool: (tool: Tool) => {
    set(() => ({
      activeTool: tool,
    }));
    AddWallManager.Instance.resetTools();
  },
  setSnap: (snap: boolean) => {
    set(() => ({
      snap: snap,
    }));
  },
  setCurrentFurniture: (fur: CurrentFurniture) => {
    set(() => {
      furniture: fur;
    });
  },
}));
