import { getUserByNik } from "@/service/firebase/dataServices/userServices";

export default async function handlerGetUserByUserName(req, res) {
  if (req.method === "GET") {
    try {
      const { userNik } = req.query;

      const data = await getUserByNik(userNik);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching all suggestions:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
