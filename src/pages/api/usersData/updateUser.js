import { updateUser } from "@/service/firebase/dataServices/userServices";

export default async function handlerUpdateUser(req, res) {
  if (req.method === "PATCH") {
    try {
      const { docId, name, nik, departemen, jabatan, role } = req.body;

      await updateUser(docId, name, nik, departemen, jabatan, role);

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
