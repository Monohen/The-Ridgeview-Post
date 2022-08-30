import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBtn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="float-right pl-3">
        <a onClick={() => signOut()} className="cursor-pointer text-base">
          Welcome, {session.user.name}
        </a>
      </div>
    );
  }
  return (
    <div className="float-right pl-3">
      <a onClick={() => signIn()} className="cursor-pointer text-base">
        Sign In
      </a>
    </div>
  );
}
