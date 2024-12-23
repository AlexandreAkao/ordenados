export interface IPlayer {
  id: number;
  name: string;
  created_at: Date;
  number: number;
  room_number: number;
  token: string;
  last_active: Date;
}
