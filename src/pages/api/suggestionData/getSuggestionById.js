import { getSuggestionById } from "@/service/firebase/dataServices/suggestionService";

export default async function handlerGetSuggestionById(req, res) {
  if (req.method === "GET") {
    try {
      const { docId } = req.query;
      const data = await getSuggestionById(docId);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
