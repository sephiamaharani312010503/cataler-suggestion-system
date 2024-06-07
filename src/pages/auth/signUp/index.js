import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target;
    const data = {
      nik: form.nik.value,
      password: form.password.value,
    };

    const result = await axios.post("/api/auth/register", data);
    if (result.status === 200) {
      form.reset();
      setIsLoading(true);
      push("/");
    } else {
      setIsLoading(false);
      setError("NIK Belum Terdaftar");
    }
  };

  return (
    <div className="container flex flex-col items-center w-full h-screen">
      {error && <div>{error}</div>}
      <div className="container w-11/12 border mt-24 p-3 md:w-1/3">
        <h1 className="font-bold text-2xl mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" name="nik" className="grow" placeholder="NIK" />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="grow"
            />
          </label>
          <div className="flex items-center justify-between mt-2 ">
            <p>
              Have an account? sign in
              <Link href="/" className="text-secondary ms-1">
                here
              </Link>
            </p>
            <button className="btn btn-sm btn-primary" type="submit">
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
