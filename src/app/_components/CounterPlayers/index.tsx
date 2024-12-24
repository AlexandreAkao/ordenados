"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Users } from "lucide-react";

import { getCountPlayersByRoom } from "@/app/repositories/playerRepository";
import { createClient } from "@/utils/supabase/client";

type CounterPlayersProps = {
  roomId: string;
};

function CounterPlayers({ roomId }: CounterPlayersProps) {
  const [count, setCount] = useState(0);
  const supabase = useMemo(() => createClient(), []);
  const channel = useMemo(() => supabase.channel("counter-player"), [supabase]);

  const fetchCount = useCallback(async () => {
    const countPlayer = (await getCountPlayersByRoom(roomId)) ?? 0;
    setCount(countPlayer);
  }, [roomId]);

  useEffect(() => {
    fetchCount();

    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "player",
          filter: `room_number=eq.${roomId}`,
        },
        fetchCount
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [channel, fetchCount, roomId, supabase]);

  return (
    <div className="flex items-center gap-2 text-green-600">
      <div className="relative">
        <Users className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      </div>
      <span className="text-sm font-medium">{count} online</span>
    </div>
  );
}

export default CounterPlayers;
