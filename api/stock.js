// api/stock.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data.json');

  if (req.method === 'GET') {
    // read and return data
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return res.status(200).json(data);
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    const body = req.body;
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
