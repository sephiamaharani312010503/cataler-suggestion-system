import { useAllStateContext } from "@/context/AllStateContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();
  const { data: session } = useSession();

  const callbackUrl = query.callbackUrl || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log("gagal");
      setIsLoading(false);
    }
  };

  const handlerSignOut = async () => {
    await signOut();
  };
  return (
    <div className="container w-full relative">
      <div className="flex flex-row-reverse justify-center mt-24">
        <div className="container w-1/2 ms-10 rounded-2xl shadow-2xl">
          <div className="flex">
            <Image
              className="rounded-lg"
              src="/static/assets/bg-pic.jpg"
              alt="background"
              width={700}
              height={400}
            />
          </div>
          <p className="font-semibold py-6 px-3">
            Situs ini adalah sebuah platform yang menyediakan sarana bagi para
            karyawan untuk memberikan saran, ide, atau kaizen yang
            berkelanjutan. Melalui platform ini, karyawan dapat berpartisipasi
            dalam meningkatkan efisiensi sistem kerja dan kinerja perusahaan,
            serta berkontribusi pada pertumbuhan dan kesuksesan{" "}
            <span className="font-bold italic text-teal-600">
              PT Cataler Indonesia.
            </span>
          </p>
          <div className="flex justify-end me-4 mb-3">
            <Link
              href={"/user/dashboard"}
              className="btn btn-sm btn-primary text-white font-bold"
              disabled={session ? false : true}>
              Dashboard{" "}
              <FontAwesomeIcon icon={faArrowRight} className="ms-1" size="sm" />
            </Link>
          </div>
        </div>
        <div className="card w-full max-w-sm shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">NIK</span>
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
                <span className="label-text">Password</span>
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
          </form>
        </div>
      </div>
    </div>
  );
}
