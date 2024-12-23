"use server";

import {
  createPlayer,
  updatePlayer,
} from "@/app/repositories/playerRepository";
import { createRoom } from "@/app/repositories/roomRepository";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function createOrGetPlayer(roomId: string) {
  const cookieStore = await cookies();
  const userName = cookieStore.get("user_name");
  const userToken = cookieStore.get("user_token");
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("player")
    .select("*")
    .eq("token", userToken?.value)
    .limit(1)
    .single();

  if (!data) {
    return await createPlayer(
      roomId,
      userToken?.value ?? "",
      userName?.value ?? ""
    );
  }

  if (data.room_number !== roomId) {
    return await updatePlayer(roomId, userToken?.value ?? "");
  }

  return data;
}

export async function createOrGetRoom(roomId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("room")
    .select("*")
    .eq("room_number", roomId)
    .limit(1)
    .single();

  if (!data) {
    return await createRoom(roomId);
  }

  return data;
}

export async function setupRoom(roomId: string) {
  await createOrGetRoom(roomId);
  await createOrGetPlayer(roomId);
}
