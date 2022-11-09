export interface IFurnitureSerializable {
  id: number;
  object_id: number;
  texturePath: string;
  name: string;
  description?: string;
  width: number;
  height: number;
  rotation: number;
  x: number;
  y: number;
  orientation: number;
  zIndex: number;
  attachedToLeft?: number;
  attachedToRight?: number;
  category?: any;
}
