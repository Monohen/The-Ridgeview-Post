import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const { data: session } = useSession();

  return (
    <div className="w-full h-20 flex flex-col shadow justify-center items-center bg-white">
      <div>
        <Link href={"/"}>
          <h1 className="text-indigo-500 font-serif text-3xl drop-shadow cursor-pointer hover:underline decoration-indigo-500">
            The Ridgeview Post
          </h1>
        </Link>
      </div>
      <div>
        <a
          href="https://www.youtube.com/user/ridgeviewravens/featured"
          className="text-base"
        >
          Ravens Report Channel
        </a>
        {session ? (
          <div className="float-right pl-3">
            <a onClick={() => signOut()} className="cursor-pointer text-base">
              Welcome {session.user.name}
            </a>
          </div>
        ) : (
          <div className="float-right pl-3">
            <a onClick={() => signIn()} className="cursor-pointer text-base">
              Sign In
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
