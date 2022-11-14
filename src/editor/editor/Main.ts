import { IViewportOptions, PluginManager, Viewport } from "pixi-viewport";
import {
  Application,
  Graphics,
  InteractionEvent,
  isMobile,
  Loader,
  Point,
  TilingSprite,
} from "pixi.js";
import { FloorPlan } from "./objects/FloorPlan";
import { TransformLayer } from "./objects/TransformControls/TransformLayer";
import { useStore } from "../../stores/EditorStore";
import { AddNodeAction } from "./actions/AddNodeAction";
import { AddWallManager } from "./actions/AddWallManager";
import { viewportX, viewportY } from "../../helpers/ViewportCoordinates";
import { Tool } from "./constants";
import { Pointer } from "./Pointer";
import { Preview } from "./actions/MeasureToolManager";
import { showNotification } from "@mantine/notifications";
import { DeviceFloppy } from "tabler-icons-react";
import { addDesign } from "../../api/api-client";

export class Main extends Viewport {
  private floorPlan: FloorPlan;
  public static viewportPluginManager: PluginManager;
  public static app: Application;
  transformLayer: TransformLayer;
  addWallManager: AddWallManager;
  bkgPattern: TilingSprite;
  public pointer: Pointer;
  public preview: Preview;
  public g: any;
  constructor(options: IViewportOptions) {
    super(options);

    // connect the events
    Loader.shared.onComplete.once(this.setup, this);
    // Start loading!
    Loader.shared.load();
    this.preview = new Preview();

    // const graphics = new Graphics();
    // graphics.lineStyle(4, 0xffd900, 1);
    // graphics.moveTo(50, 350);
    // graphics.lineTo(250, 350);
    // graphics.lineTo(100, 400);
    // graphics.lineTo(50, 350);
    // graphics.closePath();
    // graphics.endFill();
    // this.addChild(graphics);
    this.addChild(this.preview.getReference());
    this.cursor = "none";
  }

  private setup() {
    Main.viewportPluginManager = this.plugins;
    this.drag({ mouseButtons: "right" })
      .clamp({ direction: "all" })
      .pinch()
      .wheel()
      .clampZoom({ minScale: 0.3, maxScale: 6.0 });
    this.bkgPattern = TilingSprite.from("/pattern.svg", {
      width: this.worldWidth ?? 0,
      height: this.worldHeight ?? 0,
    });
    this.center = new Point(this.worldWidth / 2, this.worldHeight / 2);
    this.addChild(this.bkgPattern);
    //add custom pattern
    // this.bkgPattern = TilingSprite.from("/floor.svg", {
    //   width: this.worldWidth / 2 ?? 0,
    //   height: this.worldHeight / 2 ?? 0,
    // });
    // this.addChild(this.bkgPattern);

    this.floorPlan = FloorPlan.Instance;
    this.addChild(this.floorPlan);

    this.transformLayer = TransformLayer.Instance;
    this.addChild(this.transformLayer);

    this.addWallManager = AddWallManager.Instance;
    this.addChild(this.addWallManager.preview.getReference());

    this.pointer = new Pointer();
    this.addChild(this.pointer);
    this.on("pointerdown", this.checkTools);
    this.on("pointermove", this.updatePreview);
    this.on("pointerup", this.updateEnd);
  }
  private updatePreview(ev: InteractionEvent) {
    this.addWallManager.updatePreview(ev);
    this.preview.updatePreview(ev);
    this.pointer.update(ev);
  }
  private updateEnd(ev: InteractionEvent) {
    switch (useStore.getState().activeTool) {
      case Tool.Measure:
        this.preview.set(undefined);
        this.pause = false;
        break;
      case Tool.WallAdd:
        if (!isMobile) {
          this.pause = false;
        }
        break;
      case Tool.Edit:
        this.pause = false;
        break;
    }
  }
  private checkTools(ev: InteractionEvent) {
    ev.stopPropagation();

    if (ev.data.button == 2 || ev.data.button == 2) {
      return;
    }
    let point = { x: 0, y: 0 };
    switch (useStore.getState().activeTool) {
      case Tool.WallAdd:
        this.pause = true;
        point.x = viewportX(ev.data.global.x);
        point.y = viewportY(ev.data.global.y);
        let action = new AddNodeAction(undefined, point);
        action.execute();
        break;
      case Tool.Edit:
        // if (!isMobile) {
        //     this.pause = true;
        // }
        break;
      case Tool.Measure:
        this.pause = true;
        point.x = viewportX(ev.data.global.x);
        point.y = viewportY(ev.data.global.y);
        this.preview.set(point);
        break;
    }
  }
}

let save = () => {
  let data = FloorPlan.Instance.save();

  localStorage.setItem("autosave", data);
};
// setInterval(autosave, 60000)

document.onkeydown = (e) => {
  if (e.code == "KeyS" && e.ctrlKey) {
    e.preventDefault();
    save();
    showNotification({
      message: "Saved to Local Storage!",
      color: "green",
      icon: DeviceFloppy,
    });
  }
};
