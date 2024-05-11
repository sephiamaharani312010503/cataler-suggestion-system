import { getSuggestionByUserName } from "@/service/firebase/dataServices/suggestionService";

export default async function handlerGetSuggestioByUserName(req, res) {
  if (req.method === "GET") {
    try {
      const { userNik } = req.query;

      const data = await getSuggestionByUserName(userNik);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching all suggestions:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
