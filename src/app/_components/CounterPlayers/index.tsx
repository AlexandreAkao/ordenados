"use client";

import { useCallback, useEffect, useState } from "react";

import { getCountPlayersByRoom } from "@/app/repositories/playerRepository";
import { createClient } from "@/utils/supabase/client";

type CounterPlayersProps = {
  roomId: string;
};

function CounterPlayers({ roomId }: CounterPlayersProps) {
  const [count, setCount] = useState(0);
  const supabase = createClient();
  const channel = supabase.channel("counter-player");

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
        async () => {
          await fetchCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channel, fetchCount, roomId, supabase]);

  return <div>Count: {count}</div>;
}

export default CounterPlayers;
