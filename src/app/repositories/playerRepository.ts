"use server";

import { createClient } from "@/utils/supabase/client";

export async function createPlayer(
  roomNumber: string,
  token: string,
  name: string
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("player")
    .insert({ room_number: roomNumber, token, name });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updatePlayer(roomNumber: string, token: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("player")
    .update({ room_number: roomNumber })
    .eq("token", token);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCountPlayersByRoom(roomNumber: string) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("player")
    .select("*", { count: "exact" })
    .eq("room_number", roomNumber);

  if (error) {
    throw new Error(error.message);
  }

  return count;
}

export async function getPlayerByToken(token: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("player")
    .select("*")
    .eq("token", token)
    .limit(1)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
