import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "data.json");

    // ---- READ DATA ----
    if (req.method === "GET") {
      const jsonData = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(jsonData);
      res.status(200).json(data);
      return;
    }

    // ---- WRITE DATA ----
    if (req.method === "POST") {
      const body = req.body;

      if (!body || !body.stock) {
        res.status(400).json({ error: "Missing stock or transaction data" });
        return;
      }

      fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
      res.status(200).json({ success: true });
      return;
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
}
