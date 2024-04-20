import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar shadow-lg shadow-gray-400/50 relative">
      <div className="flex-1">
        <Link href={"/"} className="flex items-center ms-2">
          <Image
            src="/static/assets/logo-single.jpg"
            alt="logo"
            width={120}
            height={100}
          />
          <p className="text-xl text-teal-500 underline-offset-1 font-bold italic ms-2">
            Suggestion System
          </p>
        </Link>
      </div>
      <div className="flex-none">
        {session ? (
          <button
            onClick={signOut}
            className="btn btn-sm bg-emerald-600 text-white hover:bg-emerald-600">
            Sign Out
          </button>
        ) : (
          <Link
            href={"/auth/signIn"}
            className="btn btn-sm bg-emerald-600 text-white hover:bg-emerald-600">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
