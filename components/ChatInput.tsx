"use client"

import { useState } from "react";
import { Input } from "./ui/input"
import { Button } from "./ui/button";

interface ChatInputProps {
  addMessage: (message: string) => void;
}

export const ChatInput = ({ addMessage }: ChatInputProps): JSX.Element => {
  const [message, setMessage] = useState<string>("");

  return (
    <form className="flex flex-row">
      <Input
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <Button
        type="submit"
        onClick={() => { 
          addMessage(message); 
          setMessage("");
        }}
      >
        Send
      </Button>
    </form>
  );
}