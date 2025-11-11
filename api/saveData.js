// /api/saveData.js
import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
  const owner = "kfaizan204-max";        // your GitHub username
  const repo = "Care-Pro-Uniform";       // your repo name
  const path = "data.json";              // file to read/write
  const token = process.env.GITHUB_TOKEN; // stored safely in Vercel

  const octokit = new Octokit({ auth: token });

  try {
    // get the file from GitHub
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    const content = Buffer.from(data.content, "base64").toString();

    if (req.method === "GET") {
      res.status(200).json(JSON.parse(content));
      return;
    }

    if (req.method === "POST") {
      const updated = JSON.stringify(req.body, null, 2);

      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message: "Update data.json from Vercel",
        content: Buffer.from(updated).toString("base64"),
        sha: data.sha,
      });

      res.status(200).json({ success: true });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
