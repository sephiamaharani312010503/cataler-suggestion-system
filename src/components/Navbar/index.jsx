import { useAllStateContext } from "@/context/AllStateContext";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { showMenu, setShowMenu } = useAllStateContext();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const { data: session } = useSession();

  return (
    <>
      <div
        className={
          showMenu
            ? "navbar relative"
            : "navbar shadow-md shadow-gray-400/50 relative"
        }>
        <div className="container flex-1 w-full">
          <Link
            href={"/dashboard/user"}
            className="flex w-full items-center ms-2">
            <Image
              src="/static/assets/logo-single.jpg"
              alt="logo"
              width={120}
              height={100}
            />
            <p className="text-lg text-teal-500 font-bold italic ms-2 md:text-xl">
              E-Kaizen
            </p>
          </Link>
        </div>
        <div className="hidden flex-none md:block">
          {session ? (
            <button
              onClick={signOut}
              className="btn btn-sm bg-emerald-600 text-white hover:bg-emerald-600">
              Sign Out
            </button>
          ) : (
            <Link
              href={"/"}
              className="btn btn-sm bg-emerald-600 text-white hover:bg-emerald-600">
              Sign In
            </Link>
          )}
        </div>
        <span className="me-2 md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            size="lg"
            onClick={toggleMenu}
            className="cursor-pointer"
          />
        </span>
      </div>
      <div className={showMenu ? "container w-full shadow-md" : "hidden"}>
        <div className="flex justify-end pe-4 pb-3">
          {session ? (
            <button onClick={signOut} className="link link-hover font-bold">
              Sign Out
            </button>
          ) : (
            <Link href={"/"} className="link link-hover font-bold">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Navbar;
