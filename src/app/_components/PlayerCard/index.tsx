"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Info, Lightbulb } from "lucide-react";
import clsx from "clsx";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CounterPlayers from "@/app/_components/CounterPlayers";
import PlayerNumber from "@/app/_components/PlayerNumber";
import { getRandomCategory } from "@/data/categories";
import getRandomEmoji from "@/data/emojis";

type PlayerCardProps = {
  roomId: string;
  token: string;
  userName: string;
};

function PlayerCard({ roomId, token, userName }: PlayerCardProps) {
  const [isFliped, setIsFliped] = useState(false);
  const category = useMemo(() => getRandomCategory(), []);
  const emoji = useMemo(() => getRandomEmoji(), []);

  const handleFlip = () => {
    setIsFliped((prev) => !prev);
  };

  return (
    <div className="group w-full h-[600px] max-w-md perspective-1000">
      <div
        className={clsx(
          `relative w-full h-full preserve-3d transition-transform duration-1000 cursor-pointer`,
          { "rotate-y-180": isFliped }
        )}
        onClick={handleFlip}
      >
        <Card className="absolute w-full h-full max-w-md bg-slate-50 backdrop-blur shadow-xl border-0 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <span>{emoji}</span>
              <span className="font-medium text-gray-700 text-ellipsis overflow-hidden max-w-52 text-nowrap">
                {userName}
              </span>
            </div>
            <CounterPlayers roomId={roomId} />
          </CardHeader>
          <div className="text-center py-2 px-4 bg-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Sala {roomId}
            </h2>
          </div>
          <div className="mt-4 mx-4 flex items-center justify-center gap-2 bg-yellow-100 px-4 py-2 rounded-lg">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-800">
              Tema sugerido: {category}
            </span>
          </div>
          <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
            <PlayerNumber token={token} />
          </CardContent>
          <div className="text-gray-500 font-medium text-center inline-flex items-center gap-2 justify-center text-sm mb-2">
            <Info size={16} />
            clique para virar
          </div>
        </Card>
        <div className="rounded-2xl absolute w-full h-full rotate-y-180 backface-hidden shadow-xl translate-z-0">
          <Card className="absolute bg-zinc-900 w-full h-full max-w-md shadow-xl border-0 flex flex-col">
            <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
              <Image
                src="/silence.png"
                alt="emoji fazendo silencio"
                className="w-full h-auto"
                width={300}
                height={0}
                priority
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
