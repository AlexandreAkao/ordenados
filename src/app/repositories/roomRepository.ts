import { createClient } from "@/utils/supabase/client";

export async function createRoom(roomNumber: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("room")
    .insert({ room_number: roomNumber });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getRoomById(roomNumber: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("room")
    .select("*")
    .eq("room_number", roomNumber)
    .limit(1)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
