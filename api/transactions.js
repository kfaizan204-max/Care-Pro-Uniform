import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "transactions.json");

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Read all transactions
      const data = fs.readFileSync(filePath, "utf8");
      const transactions = JSON.parse(data || "[]");
      return res.status(200).json(transactions);
    }

    if (req.method === "POST") {
      // Add a new transaction
      const newTrans = req.body;
      const data = fs.readFileSync(filePath, "utf8");
      const transactions = JSON.parse(data || "[]");
      transactions.push(newTrans);
      fs.writeFileSync(filePath, JSON.stringify(transactions, null, 2));
      return res.status(200).json({ success: true, message: "Transaction added" });
    }

    if (req.method === "DELETE") {
      // Delete by ID from URL
      const { id } = req.query;
      const data = fs.readFileSync(filePath, "utf8");
      let transactions = JSON.parse(data || "[]");
      const before = transactions.length;
      transactions = transactions.filter(t => t.id !== id);
      fs.writeFileSync(filePath, JSON.stringify(transactions, null, 2));

      if (transactions.length === before)
        return res.status(404).json({ success: false, message: "Transaction not found" });

      return res.status(200).json({ success: true, message: "Transaction deleted" });
    }

    // If no method matched
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Error in /api/transactions:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}
