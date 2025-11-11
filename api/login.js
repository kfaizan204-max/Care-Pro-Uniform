export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // ✅ Vercel requires parsing body differently
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { id, password } = body;

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
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
