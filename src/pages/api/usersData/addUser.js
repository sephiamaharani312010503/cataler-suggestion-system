import { addUser } from "@/service/firebase/dataServices/userServices";

export default async function handlerAddUser(req, res) {
  if (req.method === "POST") {
    try {
      const { name, nik, departemen, jabatan, role } = req.body;
      await addUser(name, nik, departemen, jabatan, role);
      res.status(200).json({ message: "User added successfully" });
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
