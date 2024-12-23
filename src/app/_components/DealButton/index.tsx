"use client";

import { createClient } from "@/utils/supabase/client";

type DealButtonProps = {
  roomId: string;
};

function DealButton({ roomId }: DealButtonProps) {
  const supabase = createClient();
  const dealCardsNumbers = async () => {
    await supabase.rpc("generate_random_numbers", { room_id: roomId });
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={dealCardsNumbers}
    >
      Start
    </button>
  );
}

export default DealButton;
