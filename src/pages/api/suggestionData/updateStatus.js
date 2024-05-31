import { updateStatus } from "@/service/firebase/dataServices/suggestionService";

export default async function handlerUpdateStatus(req, res) {
  if (req.method === "PATCH") {
    try {
      const { docId, status } = req.body;
      await updateStatus(docId, status);
      res.status(200).json({ message: "Status added successfully" });
    } catch (error) {
      console.error("Error adding suggestion:", error);
      res.status(500).json({ message: "Failed to add status to Firestore" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
