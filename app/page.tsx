import { SignIn } from "@/components/sign-in";
import { Navbar } from "@/components/navbar";
import { ChatWindow } from "@/components/ChatWindow";

export interface Message {
  text: string;
  system: boolean;
}

export default function Home(): JSX.Element {
  // const session = use(getServerSession(authOptions));
  // console.log(session);

  return (
    <main className="flex flex-col p-2 h-screen">
      <Navbar />
      <SignIn />
      <ChatWindow />
    </main>
  );
}
