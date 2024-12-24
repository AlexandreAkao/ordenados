"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";

import { getPlayerByToken } from "@/app/repositories/playerRepository";
import { IPlayer } from "@/models/player";
import { createClient } from "@/utils/supabase/client";
import { useInfoSystem } from "@/app/_context/useInfoSystem";

type PlayerNumberProps = {
  token: string;
};

function PlayerNumber({ token }: PlayerNumberProps) {
  const [key, setKey] = useState(0);

  const { setIsLoading, isLoading } = useInfoSystem();
  const [player, setPlayer] = useState<IPlayer>();
  const supabase = useMemo(() => createClient(), []);
  const channel = useMemo(() => supabase.channel("dealer"), [supabase]);
  const number = isLoading ? 100 : player?.number ?? 0;

  const fetchPlayer = useCallback(async () => {
    const fetchPlayer = await getPlayerByToken(token);
    setPlayer(fetchPlayer);
    setIsLoading(false);
  }, [setIsLoading, token]);

  const onEndCount = () => {
    if (isLoading) {
      setKey((prev) => prev + 1);
    }
  };

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

  return (
    <div>
      <div className="text-[180px] font-black text-gray-800 leading-none tracking-tight mb-4 text-center">
        {player?.number ? (
          <CountUp key={key} end={number} start={0} onEnd={onEndCount} />
        ) : (
          "?"
        )}
      </div>
      <div className="mt-4 text-gray-500 font-medium text-center">
        Número sorteado
      </div>
    </div>
  );
}

export default PlayerNumber;
