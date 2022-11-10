import saveAs from "file-saver";
import { addDesign } from "../../../api/api-client";
import { FloorPlan } from "../objects/FloorPlan";
import { Action } from "./Action";

export class SaveAction implements Action {
  private receiver: FloorPlan;
  constructor() {
    this.receiver = FloorPlan.Instance;
  }

  public async execute() {
    let data = this.receiver.save();
    //console.log(JSON.parse(data));
    const image = await this.receiver.getImage();
    const result = await addDesign(JSON.parse(data), image);
    // console.log(result);
    //let blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    //saveAs(blob, "floor_plan.txt");
  }
}
