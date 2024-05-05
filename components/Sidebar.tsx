"use client";

import { Menu, Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { type Conversation } from "@/types/chat";
import { useState } from "react";
import { DarkModeButton } from "./DarkModeButton";
import { redirect, useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";
import { createChat } from "@/services/client/create-chat";

interface SidebarProps {
  conversations: Conversation[];
}

export const Sidebar = ({ conversations }: SidebarProps): JSX.Element => {
  const [open, setOpen] = useState(true);

  const segment = useSelectedLayoutSegment();
  let currentChatId: number | undefined;
  if (segment && parseInt(segment)) {
    currentChatId = parseInt(segment);
  }

  return (
    <div className="flex flex-col bg-secondary text-secondary-foreground">
      <div className="flex items-center">
        <Button
          variant="default"
          className="m-1"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <Menu />
        </Button>
        {open && (
          <h1 className="inline pl-1.5 text-lg font-bold">Chat History</h1>
        )}
      </div>
      {open && (
        <>
          {conversations.map((conversation, index) => (
            <Link
              href={`/chat/${conversation.conversation_id}`}
              key={conversation.title + index}
            >
              <div
                className={cn("mx-1 my-2 rounded-lg p-2 hover:bg-neutral-700", {
                  "bg-neutral-700":
                    currentChatId === conversation.conversation_id,
                })}
              >
                {conversation.title}
              </div>
            </Link>
          ))}
          <button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              createChat();
            }}
          >
            <div className="mx-1 my-2 flex flex-row justify-center rounded-lg p-2 text-center text-neutral-500 hover:bg-neutral-700">
              New Chat{" "}
              <Plus className="my-auto ml-2 inline" height={15} width={15} />
            </div>
          </button>
        </>
      )}
      <div className="mt-auto">
        <DarkModeButton />
      </div>
    </div>
  );
};
