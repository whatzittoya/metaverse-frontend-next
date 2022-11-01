import { FloorSerializable } from "./FloorSerializable";

export class FloorPlanSerializable {
  name: String;
  status: String;
  floors: FloorSerializable[];
  public furnitureId: number;
  public wallNodeId: number;

  constructor() {
    this.floors = [];
  }
}
