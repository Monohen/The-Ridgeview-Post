import Link from "next/link";
import styles from "../styles/Header.module.css";

function Header() {
  return (
    <header className="">
      <div className="flex flex-col justify-center items-center w-full m-h-14 bg-white shadow">
        <div>
          <Link href="/">
            <h1 className="text-3xl cursor-pointer font-serif">
              The Ridgeview Post
            </h1>
          </Link>
        </div>
        <div className="pb-2">
          <a href="https://www.youtube.com/user/ridgeviewravens/featured">
            Raven's Report Channel
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
