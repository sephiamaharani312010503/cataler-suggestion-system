import { updateSuggestion } from "@/service/firebase/dataServices/suggestionService";

export default async function handlerUpdateSuggestion(req, res) {
  if (req.method === "PATCH") {
    try {
      const { docId, category, title, currentCondition, suggestion } = req.body;

      await updateSuggestion(
        docId,
        category,
        title,
        currentCondition,
        suggestion
      );

      res.status(200).json({
        message: "Form data updated in Firestore successfully",
      });
    } catch (error) {
      console.error("Error updating form data in Firestore:", error);
      res
        .status(500)
        .json({ message: "Failed to update form data in Firestore" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
