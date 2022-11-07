import React from "react";
import { useStore } from "../../../../stores/EditorStore";

function propPanel() {
  useStore().setCurrentFurniture({ name: "a", description: "a" });
}

export default propPanel;
