import { FloorPlan } from "../objects/FloorPlan";
import { Action } from "./Action";

// Action for removing furniture piece from FloorPlan.
export class UpdateFurnitureAction implements Action {
  private id: number;
  private descr: string;
  private api: string;
  private interactable: string;
  private receiver: FloorPlan;

  constructor(id: number, descr: string, api: string, interactable: string) {
    this.id = id;
    this.descr = descr;
    this.api = api;
    this.interactable = interactable;
    this.receiver = FloorPlan.Instance;
  }

  public execute() {
    console.log(this);
    this.receiver.updateFurnitureDesc(
      this.id,
      this.descr,
      this.api,
      this.interactable
    );
  }
}
