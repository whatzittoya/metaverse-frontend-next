import { FloorPlan } from "../objects/FloorPlan";
import { Action } from "./Action";

export class LoadAction implements Action {
  private receiver: FloorPlan;
  private loadData: string;
  constructor(loadData: string) {
    this.receiver = FloorPlan.Instance;
    this.loadData = loadData;
  }

  public execute() {
    console.log(this.loadData);
    this.receiver.load(this.loadData);
  }
}
