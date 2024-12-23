"use client";

import Image from "next/image";
import { redirect, RedirectType } from "next/navigation";
import { ChangeEventHandler, useRef, useState } from "react";
import { setCookies } from "@/app/actions";

export default function Home() {
  const [room, setRoom] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const onChangRoom: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();

    const numberRegex = /\d+/;
    const currentRoom = event.target.value;
    const [match] = currentRoom.match(numberRegex) || [];

    setRoom(match || "");
  };

  const redirectToRoom = async () => {
    if (!room || !nameRef.current?.value) {
      return;
    }
    await setCookies("user_name", nameRef.current.value);
    redirect(`/room/${room}`, RedirectType.push);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <Image
          src="/logo.png"
          alt="logo"
          className="w-full h-auto"
          width="300"
          height="0"
        />
        <input
          className="w-full p-4 text-lg text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          name="name"
          id="name"
          placeholder="Nome"
          ref={nameRef}
        />
        <input
          className="w-full p-4 text-lg text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          name="room"
          id="room"
          placeholder="Número da sala"
          onChange={onChangRoom}
          value={room}
        />
        <button
          className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={redirectToRoom}
        >
          Entrar
        </button>
      </main>
    </div>
  );
}
