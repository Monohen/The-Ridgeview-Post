import Link from "next/link";

function Header() {
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
      </div>
    </div>
  );
}

export default Header;
