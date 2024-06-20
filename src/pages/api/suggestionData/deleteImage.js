import { deleteImage } from "@/service/firebase/dataServices/uploadImageService";

export default async function handlerDeleteImage(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { filePath } = req.body;

  if (!filePath) {
    return res.status(400).json({ error: "File path is required" });
  }

  try {
    await deleteImage(filePath);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting file" });
  }
}
