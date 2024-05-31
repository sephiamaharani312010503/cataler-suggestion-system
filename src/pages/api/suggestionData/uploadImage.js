import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), "/public/uploads"),
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        res.status(500).json({ error: "Failed to upload file" });
        return;
      }

      const file = files.file;
      if (!file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const newFilename = Date.now() + path.extname(file.name);
      const newPath = path.join(form.uploadDir, newFilename);

      fs.rename(file.path, newPath, (err) => {
        if (err) {
          console.error("File rename error:", err);
          res.status(500).json({ error: "Failed to save file" });
          return;
        }

        console.log("File uploaded successfully:", newPath);
        res
          .status(200)
          .json({ message: "File uploaded successfully", path: newPath });
      });
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
