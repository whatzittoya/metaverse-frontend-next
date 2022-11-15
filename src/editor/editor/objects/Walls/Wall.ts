import { Graphics, InteractionEvent } from "pixi.js";
import { getDoor, getPeople, getWindow } from "../../../../api/api-client";
import { euclideanDistance } from "../../../../helpers/EuclideanDistance";
import { Point } from "../../../../helpers/Point";
import { getCorrespondingY } from "../../../../helpers/Slope";
import { transformData } from "../../../../helpers/TransformData";
import { viewportX, viewportY } from "../../../../helpers/ViewportCoordinates";

import { useStore } from "../../../../stores/EditorStore";
import { AddFurnitureAction } from "../../actions/AddFurnitureAction";
import { AddNodeAction } from "../../actions/AddNodeAction";
import { DeleteWallAction } from "../../actions/DeleteWallAction";
import { INTERIOR_WALL_THICKNESS, Tool, WALL_THICKNESS } from "../../constants";
import { Label } from "../TransformControls/Label";
import { WallNode } from "./WallNode";

export class Wall extends Graphics {
  leftNode: WallNode;
  rightNode: WallNode;
  length: number;
  label: Label;

  x1: number;
  x2: number;
  y1: number;
  y2: number;
  thickness: number;
  isExteriorWall: boolean;

  dragging: boolean;
  mouseStartPoint: Point;
  startLeftNode: Point;
  startRightNode: Point;

  constructor(leftNode: WallNode, rightNode: WallNode) {
    super();
    this.sortableChildren = true;

    this.interactive = true;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
    this.dragging = false;
    this.mouseStartPoint = { x: 0, y: 0 };
    this.startLeftNode = { x: 0, y: 0 };
    this.startRightNode = { x: 0, y: 0 };
    this.setLineCoords();
    this.label = new Label(0);
    //change scale of wall label
    this.label.scale.set(0.4, 0.4);
    this.addChild(this.label);
    this.thickness = INTERIOR_WALL_THICKNESS;
    this.pivot.set(0, INTERIOR_WALL_THICKNESS / 2);
    this.zIndex = 100;
    this.isExteriorWall = false;
    // this.drawLine();

    this.on("pointerdown", this.onMouseDown);
    this.on("rightdown", this.onRightDown);
    this.on("pointermove", this.onMouseMove);
    this.on("pointerup", this.onMouseUp);
    this.on("pointerupoutside", this.onMouseUp);
  }

  public setIsExterior(value: boolean) {
    this.isExteriorWall = value;
    if (value) {
      this.thickness = WALL_THICKNESS;
    } else {
      this.thickness = INTERIOR_WALL_THICKNESS;
    }
    this.pivot.set(0, this.thickness / 2);
    this.leftNode.setSize(this.thickness);
    this.rightNode.setSize(this.thickness);
    this.drawLine();
  }

  public getIsExterior() {
    return this.isExteriorWall;
  }
  public setLineCoords() {
    if (this.leftNode.x == this.rightNode.x) {
      if (this.leftNode.y < this.rightNode.y) {
        return [
          this.leftNode.x,
          this.leftNode.y,
          this.rightNode.x,
          this.rightNode.y,
        ];
      } else {
        return [
          this.rightNode.x,
          this.rightNode.y,
          this.leftNode.x,
          this.leftNode.y,
        ];
      }
    } else if (this.leftNode.x < this.rightNode.x) {
      return [
        this.leftNode.x,
        this.leftNode.y,
        this.rightNode.x,
        this.rightNode.y,
      ];
    } else {
      return [
        this.rightNode.x,
        this.rightNode.y,
        this.leftNode.x,
        this.leftNode.y,
      ];
    }
  }

  public drawLine() {
    this.clear();
    [this.x1, this.y1, this.x2, this.y2] = this.setLineCoords();
    this.lineStyle(1, 0x1a1a1a);

    let theta = Math.atan2(this.y2 - this.y1, this.x2 - this.x1); // aflu unghiul sa pot roti
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    this.length = euclideanDistance(this.x1, this.x2, this.y1, this.y2);

    //draw texture wall
    this.beginFill().drawRect(0, 0, this.length, this.thickness).endFill();
    this.position.set(this.x1, this.y1);
    this.angle = theta;

    this.leftNode.angle = theta;
    this.rightNode.angle = theta;

    this.label.update(this.length - WALL_THICKNESS);
    this.label.position.x = this.width / 2;
    this.label.angle = 360 - theta;

    this.label.position.y = 25;
    this.label.zIndex = 998;
  }

  private onRightDown(ev: InteractionEvent) {
    ev.stopPropagation();
    this.setIsExterior(!this.isExteriorWall);
    return;
  }

  private onMouseMove(ev: InteractionEvent) {
    if (!this.dragging) {
      return;
    }
    let currentPoint = ev.data.global;
    let delta = {
      x: currentPoint.x - this.mouseStartPoint.x,
      y: currentPoint.y - this.mouseStartPoint.y,
    };

    this.leftNode.setPosition(
      this.startLeftNode.x + delta.x,
      this.startLeftNode.y + delta.y
    );
    this.rightNode.setPosition(
      this.startRightNode.x + delta.x,
      this.startRightNode.y + delta.y
    );
  }

  private onMouseUp(ev: InteractionEvent) {
    this.dragging = false;
    return;
  }

  private onMouseDown(ev: InteractionEvent) {
    ev.stopPropagation();
    // const graphics = new Graphics();
    // graphics.beginFill(0xff3300);
    // graphics.lineStyle(4, 0xffd900, 1);
    // graphics.moveTo(50, 350);
    // graphics.lineTo(250, 350);
    // graphics.lineTo(100, 400);
    // graphics.lineTo(50, 350);
    // graphics.closePath();
    // graphics.endFill();
    // this.addChild(graphics);

    let coords = {
      x: viewportX(ev.data.global.x),
      y: viewportY(ev.data.global.y),
    };
    let localCoords = ev.data.getLocalPosition(this);

    const state = useStore.getState();

    if (state.activeTool == Tool.Remove) {
      let action = new DeleteWallAction(this);
      action.execute();
    }

    if (state.activeTool == Tool.WallAdd) {
      const addNode = new AddNodeAction(this, coords);
      addNode.execute();
    }
    if (state.activeTool == Tool.FurnitureAddWindow) {
      getWindow().then((res_raw) => {
        const res = transformData(res_raw);
        let action = new AddFurnitureAction(
          res[0],
          this,
          { x: localCoords.x, y: 0 },
          this.leftNode.getId(),
          this.rightNode.getId()
        );
        action.execute();
      });
    }

    if (state.activeTool == Tool.FurnitureAddDoor) {
      getDoor().then((res_raw) => {
        const res = transformData(res_raw);

        let action = new AddFurnitureAction(
          res[0],
          this,
          { x: localCoords.x, y: 0 },
          this.leftNode.getId(),
          this.rightNode.getId()
        );
        action.execute();
      });
    }

    if (state.activeTool == Tool.Edit && !this.dragging) {
      this.dragging = true;
      this.mouseStartPoint.x = viewportX(ev.data.global.x);
      this.mouseStartPoint.y = viewportY(ev.data.global.y);
      this.startLeftNode.x = this.leftNode.position.x;
      this.startLeftNode.y = this.leftNode.position.y;

      this.startRightNode.x = this.rightNode.position.x;
      this.startRightNode.y = this.rightNode.position.y;

      return;
    }
  }
}
