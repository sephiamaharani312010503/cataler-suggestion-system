import { addSuggestion } from "@/service/firebase/dataServices/suggestionService";

export default async function handlerAddSuggestion(req, res) {
  if (req.method === "PATCH") {
    try {
      const {
        docId,
        userName,
        userNik,
        userJabatan,
        userDepartemen,
        title,
        currentCondition,
        suggestion,
        category,
        status,
        date,
      } = req.body;
      const data = await addSuggestion(
        docId,
        userName,
        userNik,
        userJabatan,
        userDepartemen,
        title,
        currentCondition,
        suggestion,
        category,
        status,
        date
      );

      res
        .status(200)
        .json({ message: "Suggestion added successfully", id: data });
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
