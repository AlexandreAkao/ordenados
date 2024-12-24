"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getPlayerByToken } from "@/app/repositories/playerRepository";
import { IPlayer } from "@/models/player";
import { createClient } from "@/utils/supabase/client";

type PlayerNumberProps = {
  token: string;
};

function PlayerNumber({ token }: PlayerNumberProps) {
  const [player, setPlayer] = useState<IPlayer>();
  const supabase = useMemo(() => createClient(), []);
  const channel = useMemo(() => supabase.channel("dealer"), [supabase]);

  const fetchPlayer = useCallback(async () => {
    const fetchPlayer = await getPlayerByToken(token);
    setPlayer(fetchPlayer);
  }, [token]);

  useEffect(() => {
    fetchPlayer();

    const subscription = channel
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "player",
          filter: `token=eq.${token}`,
        },
        fetchPlayer
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [channel, fetchPlayer, supabase, token]);

  return <div>Numero: {player?.number}</div>;
}

export default PlayerNumber;
