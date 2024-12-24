import { cookies } from "next/headers";
import { setupRoom } from "@/app/room/[roomId]/actions";
import CounterPlayers from "@/app/_components/CounterPlayers";
import DealButton from "@/app/_components/DealButton";
import PlayerNumber from "@/app/_components/PlayerNumber";

type RoomProps = {
  params: Promise<{ roomId: string }>;
};

export default async function Room({ params }: RoomProps) {
  const { roomId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value ?? "";
  await setupRoom(roomId);

  return (
    <div>
      <h1>Room {roomId}</h1>
      <PlayerNumber token={token.toString()} />
      <CounterPlayers roomId={roomId} />
      <DealButton roomId={roomId} />
    </div>
  );
}
