import { Navbar } from "@/components/navbar";
import { ChatWindow } from "@/components/ChatWindow";

export interface Message {
  text: string;
  system: boolean;
}

export default function Home(): JSX.Element {
  return (
    <main className="flex flex-col p-2 h-screen">
      <Navbar />
      <ChatWindow />
    </main>
  );
}
