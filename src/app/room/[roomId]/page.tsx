import { cookies } from "next/headers";
import { setupRoom } from "@/app/room/[roomId]/actions";
import DealButton from "@/app/_components/DealButton";
import PlayerCard from "@/app/_components/PlayerCard";
import { InfoSystemProvider } from "@/app/_context/useInfoSystem";

type RoomProps = {
  params: Promise<{ roomId: string }>;
};

export default async function Room({ params }: RoomProps) {
  const { roomId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value ?? "";
  const userName = cookieStore.get("user_name")?.value ?? "";
  await setupRoom(roomId);

  return (
    <div className="min-h-screen flex items-center">
      <main className="w-full max-w-5xl mx-auto h-full flex flex-col items-center gap-4">
        <InfoSystemProvider token={token}>
          <PlayerCard roomId={roomId} token={token} userName={userName} />
          <DealButton roomId={roomId} />
        </InfoSystemProvider>
      </main>
    </div>
  );
}
