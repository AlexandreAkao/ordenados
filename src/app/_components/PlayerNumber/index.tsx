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

  const fetchPlayer = useCallback(async () => {
    const fetchPlayer = await getPlayerByToken(token);
    setPlayer(fetchPlayer);
  }, [token]);

  useEffect(() => {
    fetchPlayer();

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
          await fetchPlayer();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPlayer, supabase, token]);

  return <div>Numero: {player?.number}</div>;
}

export default PlayerNumber;
