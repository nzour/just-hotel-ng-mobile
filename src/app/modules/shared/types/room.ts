import { Guid } from './manual';

export interface RoomOutput {
  id: Guid;
  roomType: RoomType;
  cost: number;
  images: string[];
}

export interface ServiceOutput {
  id: Guid,
  name: string,
  cost: number
}

export type RoomType = 'Single' | 'Double' | 'Triple';
