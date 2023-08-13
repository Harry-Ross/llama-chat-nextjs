import { Input } from '@/components/ui/input'
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { use } from 'react';
import { SignIn } from '@/components/sign-in';

export default function Home() {
  const session = use(getServerSession(authOptions));
  console.log(session);

  return (
    <main className="flex max-h-screen flex-col items-center justify-between p-8">
      <SignIn />
      <div className="grow-1 mb-auto">
        <h1>Hello</h1>
      </div>
      <div className="mt-auto w-full">
        <Input />
      </div>
    </main>
  )
}
