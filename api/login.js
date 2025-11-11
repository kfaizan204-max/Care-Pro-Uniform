export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Parse the incoming JSON body
    const { id, password } = req.body || {};

    // Simple in-memory users list (can later be moved to data.json)
    const USERS = [
      { id: "admin", password: "1234" },
      { id: "faizan", password: "aios" }
    ];

    const user = USERS.find(u => u.id === id && u.password === password);

    if (user) {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: { id: user.id }
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Invalid ID or password"
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
