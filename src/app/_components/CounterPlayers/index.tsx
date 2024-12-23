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

  const fetchCount = useCallback(async () => {
    const countPlayer = (await getCountPlayersByRoom(roomId)) ?? 0;
    setCount(countPlayer);
  }, [roomId]);

  useEffect(() => {
    fetchCount();

    const channel = supabase
      .channel("player")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "player",
        },
        async () => {
          await fetchCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCount, roomId, supabase]);

  return <div>Count: {count}</div>;
}

export default CounterPlayers;
