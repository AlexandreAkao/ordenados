import { createClient } from "@/utils/supabase/server";
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

  const supabase = createClient(cookieStore);

  const channel = supabase.channel(`room/${roomId}`);

  channel.subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      console.log("Connected!");

      await channel.send({
        type: "broadcast",
        event: "connected",
        payload: "connected",
      });
    }

    if (status === "CHANNEL_ERROR") {
      // console.log(`There was an error subscribing to channel: ${err.message}`);
      await channel.send({
        type: "broadcast",
        event: "error",
        payload: "error",
      });
    }

    if (status === "TIMED_OUT") {
      console.log("Realtime server did not respond in time.");
      await channel.send({
        type: "broadcast",
        event: "timeout",
        payload: "timeout",
      });
    }

    if (status === "CLOSED") {
      console.log("Realtime channel was unexpectedly closed.");
      await channel.send({
        type: "broadcast",
        event: "closed",
        payload: "closed",
      });
    }
  });

  return (
    <div>
      <h1>Room {roomId}</h1>
      <PlayerNumber token={token.toString()} />
      <CounterPlayers roomId={roomId} />
      <DealButton roomId={roomId} />
    </div>
  );
}
