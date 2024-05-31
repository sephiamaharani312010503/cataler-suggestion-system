import { setUserPoint } from "@/service/firebase/dataServices/suggestionService";

export default async function handlerSetUserPoint(req, res) {
  if (req.method === "PATCH") {
    try {
      const { userNik } = req.body;
      await setUserPoint(userNik);
      res.status(200).json({ message: "Status added successfully" });
    } catch (error) {
      console.error("Error adding suggestion:", error);
      res.status(500).json({ message: "Failed to add status to Firestore" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
