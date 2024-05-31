import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useAllStateContext } from "@/context/AllStateContext";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const { push, query } = useRouter();
  const { data: session } = useSession();

  const { setShowMenu } = useAllStateContext();

  const callbackUrl = query.callbackUrl || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowMenu(false);
    setIsLoading(true);
    const form = event.target;
    try {
      const response = await signIn("credentials", {
        redirect: false,
        nik: form.nik.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!response?.error) {
        setIsLoginFailed(false);
        setIsLoading(false);
        form.reset();
        const session = await getSession();
        if (session.user.role === "Admin") {
          push("/dashboard/admin");
        } else {
          push("/dashboard/user");
        }
      } else {
        setIsLoginFailed(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex w-full relative">
      <div className="flex w-full justify-center mt-16 md:justify-center md:mt-24 md:ms-10 md:flex-row">
        <div className="card w-full max-w-sm shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              {isLoginFailed ? (
                <p className="text-sm text-error text-center">
                  NIK atau Password Salah!
                </p>
              ) : (
                ""
              )}
              <label className="label">
                <span className="label-text font-bold">NIK</span>
              </label>
              <input
                type="text"
                name="nik"
                placeholder="NIK"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn btn-primary text-white"
                disabled={session ? true : false}>
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </div>
            {session ? (
              <Link
                href={"/dashboard/user"}
                onClick={() => setShowMenu(false)}
                className="btn btn-primary text-white font-bold mt-4 md:hidden"
                disabled={session ? false : true}>
                Dashboard
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ms-1"
                  size="sm"
                />
              </Link>
            ) : (
              ""
            )}
            <div className="mt-2">
              <Link
                href={"/auth/signUp"}
                className="text-blue-500 link link-hover">
                Buat Akun!
              </Link>
            </div>
          </form>
        </div>
        <div className="hidden md:block md:container md:w-1/2 md:ms-8 md:rounded-2xl md:shadow-2xl">
          <div className="flex flex-col md:flex-row">
            <Image
              className="rounded-lg"
              src="/static/assets/bg-pic.jpg"
              alt="background"
              width={700}
              height={400}
            />
          </div>
          <p className="font-semibold py-3 px-4">
            Situs ini adalah sebuah platform yang menyediakan sarana bagi para
            karyawan untuk memberikan saran, ide, atau kaizen yang
            berkelanjutan. Melalui platform ini, karyawan dapat dimudahkan untuk
            berpartisipasi dalam meningkatkan efisiensi sistem kerja dan kinerja
            perusahaan, serta berkontribusi pada pertumbuhan dan kesuksesan{" "}
            <span className="font-bold italic text-teal-600">
              PT Cataler Indonesia.
            </span>
          </p>
          {/* <div className="flex justify-end me-4 mb-3">
            <Link
              href={"/dashboard/user"}
              className="btn btn-sm btn-primary text-white font-bold"
              disabled={session ? false : true}>
              Dashboard{" "}
              <FontAwesomeIcon icon={faArrowRight} className="ms-1" size="sm" />
            </Link>
            <Link
              href={"/dashboard/admin"}
              className="hidden btn btn-sm btn-primary text-white font-bold"
              disabled={session ? false : true}>
              Admin Dashboard{" "}
              <FontAwesomeIcon icon={faArrowRight} className="ms-1" size="sm" />
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}
