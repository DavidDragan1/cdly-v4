"use client"
import { ChatHeader } from "@/components/chat-header";
import { Logo } from "@/components/icons";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { getChatById } from "@/lib/db/queries";
import Link from "next/link";
import React from "react";

export default function SlidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="p-4 inline-flex space-x-4 min-w-full translate-y-[-8px]">
        <SidebarToggle />
        <p className="italic translate-y-[5px]">smartslides&trade;</p>
      </header>
      {/* <ChatHeader chatId={Id} selectedModelId={""} selectedVisibilityType={"private"} isReadonly={false}/> */}
      <main className="p-6">{children}</main>
      <footer className="p-4 bg-zinc-950 text-white text-center">
        Copyright &copy; {new Date().getFullYear()} 
        <Logo/> | &nbsp;
        <span className="text-zinc-300 italic">Engineered with care, backed by&nbsp;
          <Link href="https://github.com/DavidDragan1" className="underline text-orange-50">research</Link>.
        </span>
      </footer>
    </div>
  );
}
