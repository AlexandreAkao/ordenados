import { IPlayer } from "./player";
import { IRoom } from "./room";

export interface IDatabase {
  public: {
    Tables: {
      room: {
        Row: IRoom;
        Insert: IRoom;
        Update: IRoom;
      };
      player: {
        Row: IPlayer;
        Insert: IPlayer;
        Update: IPlayer;
      };
    };
  };
}
