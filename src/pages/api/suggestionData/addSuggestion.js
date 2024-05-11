import { addSuggestion } from "@/service/firebase/dataServices/suggestionService";

export default async function handlerAddSuggestion(req, res) {
  if (req.method === "POST") {
    try {
      const {
        title,
        currentCondition,
        suggestion,
        userNik,
        userName,
        category,
        status,
      } = req.body;
      await addSuggestion(
        title,
        currentCondition,
        suggestion,
        userNik,
        userName,
        category,
        status
      );
      res.status(200).json({ message: "Suggestion added successfully" });
    } catch (error) {
      console.error("Error adding suggestion:", error);
      res
        .status(500)
        .json({ message: "Failed to add suggestion to Firestore" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
