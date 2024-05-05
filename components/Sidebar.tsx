"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { type Conversation } from "@/types/chat";
import { useState } from "react";
import { DarkModeButton } from "./DarkModeButton";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

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
        </>
      )}
      <div className="mt-auto">
        <DarkModeButton />
      </div>
    </div>
  );
};
