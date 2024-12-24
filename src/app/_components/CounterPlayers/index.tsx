"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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

  return <div>Count: {count}</div>;
}

export default CounterPlayers;
