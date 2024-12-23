export type RoomStatus = "waiting" | "playing" | "finished";

export interface IRoom {
  id: number;
  created_at: Date;
  room_number: number;
  status: RoomStatus;
}
