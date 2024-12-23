"use client";
import { useCallback, useEffect, useState } from "react";

import { getPlayerByToken } from "@/app/repositories/playerRepository";
import { IPlayer } from "@/models/player";
import { createClient } from "@/utils/supabase/client";

type PlayerNumberProps = {
  token: string;
};

function PlayerNumber({ token }: PlayerNumberProps) {
  const [player, setPlayer] = useState<IPlayer>();
  const supabase = createClient();
  const channel = supabase.channel("dealer");

  const fetchPlayer = useCallback(async () => {
    const fetchPlayer = await getPlayerByToken(token);
    setPlayer(fetchPlayer);
  }, [token]);

  useEffect(() => {
    fetchPlayer();

    channel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "player",
          filter: `token=eq.${token}`,
        },
        async () => {
          await fetchPlayer();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channel, fetchPlayer, supabase, token]);

  return <div>Numero: {player?.number}</div>;
}

export default PlayerNumber;
