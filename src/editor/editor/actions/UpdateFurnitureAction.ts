import { FloorPlan } from "../objects/FloorPlan";
import { Action } from "./Action";

// Action for removing furniture piece from FloorPlan.
export class UpdateFurnitureAction implements Action {
  private id: number;
  private descr: string;
  private receiver: FloorPlan;

  constructor(id: number, descr: string) {
    this.id = id;
    this.descr = descr;
    this.receiver = FloorPlan.Instance;
  }

  public execute() {
    console.log(this);
    this.receiver.updateFurnitureDesc(this.id, this.descr);
  }
}
