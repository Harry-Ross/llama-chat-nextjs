import { Input } from "@/components/ui/input";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { use } from "react";
import { SignIn } from "@/components/sign-in";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";

type Message = {
  text: string;
  system: boolean;
}

const mockData: Message[] = [
  {
    text: "Hello, how are you doing?",
    system: false
  },
  {
    text: "I'm doing well, how about you?",
    system: true
  }
] 

export default function Home() {
  const session = use(getServerSession(authOptions));
  console.log(session);

  return (
    <main className="flex flex-col p-2 h-screen">
      <Navbar />
      <SignIn />
      <div className="flex flex-col grow-1 h-full">
        <div className="grow-1 mb-auto">
          {mockData.map((message, index) => (
            <div key={index} className={cn("p-4 my-4 rounded-md", message.system ? "bg-blue-200" : "bg-red-200")}>
              {message.text}
            </div>
          ))}

        </div>
        <div className="mt-auto w-full">
          <Input />
        </div>
      </div>
    </main>
  );
}
