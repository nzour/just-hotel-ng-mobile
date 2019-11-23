import { Guid, Timestamp } from './manual';

export interface RoomOutput {
  id: Guid;
  roomType: RoomType;
  cost: number;
  isRented: boolean;
}

export interface RentOutput {
  id: Guid,
  cost: number,
  room: RoomOutput,
  startedAt: Timestamp,
  expiredAt: Timestamp
}

export interface ServiceOutput {
  id: Guid,
  name: string,
  cost: number
}

export type RoomType = 'Single' | 'Double' | 'Triple';
