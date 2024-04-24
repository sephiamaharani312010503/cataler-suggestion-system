import { getAllSuggestion } from "@/service/firebase/dataServices/suggestionService";

export default async function handlerGetAllSuggestion(req, res) {
  if (req.method === "GET") {
    try {
      const data = await getAllSuggestion();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching all suggestions:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
