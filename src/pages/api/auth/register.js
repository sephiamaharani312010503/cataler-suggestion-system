import { signUp } from "@/service/firebase/authServices";

export default async function handlerUserRegister(req, res) {
  if (req.method === "POST") {
    await signUp(req.body, (status) => {
      if (status) {
        res.status(200).json({ status: true, message: "success" });
      } else {
        res.status(400).json({ status: false, message: "failed" });
      }
    });
  } else {
    res.status(405).json({ status: false, message: "Method not allowed" });
  }
}
