"use client";
import { useMemo } from "react";
import clsx from "clsx";

import { createClient } from "@/utils/supabase/client";
import { useInfoSystem } from "@/app/_context/useInfoSystem";

type DealButtonProps = {
  roomId: string;
};

function DealButton({ roomId }: DealButtonProps) {
  const { isLoading, setIsLoading } = useInfoSystem();
  const supabase = useMemo(() => createClient(), []);

  const dealCardsNumbers = async () => {
    setIsLoading(true);
    await supabase.rpc("generate_random_numbers", { room_id: roomId });
  };

  return (
    <button
      className="w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex justify-center items-center"
      onClick={dealCardsNumbers}
      disabled={isLoading}
    >
      <svg
        className={clsx(`animate-spin h-5 w-5 mr-3 text-white`, {
          invisible: !isLoading,
        })}
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span className="pr-6">Começar</span>
    </button>
  );
}

export default DealButton;
