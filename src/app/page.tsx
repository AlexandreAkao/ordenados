"use client";

import { redirect, RedirectType } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
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

  const redirectToRoom: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!room || !nameRef.current?.value) {
      return;
    }
    await setCookies("user_name", nameRef.current.value);
    redirect(`/room/${room}`, RedirectType.push);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-5xl mx-auto flex flex-col gap-2 space-y-2 row-start-2 items-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          ORGANIZADOS
        </h1>
        <h3 className="text-xl md:text-2xl font-medium text-center">
          A diversão de comunicar o incomunicável!
        </h3>
        <form onSubmit={redirectToRoom} className="space-y-2">
          <input
            className="w-full h-12 px-4 bg-white border-0 rounded-lg shadow-sm transition-all duration-200 focus:ring-2"
            type="text"
            name="name"
            id="name"
            placeholder="Nome"
            ref={nameRef}
          />
          <input
            className="w-full h-12 px-4 bg-white border-0 rounded-lg shadow-sm transition-all duration-200 focus:ring-2"
            type="text"
            name="room"
            id="room"
            placeholder="Número da sala"
            onChange={onChangRoom}
            value={room}
          />
          <button
            type="submit"
            className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}
