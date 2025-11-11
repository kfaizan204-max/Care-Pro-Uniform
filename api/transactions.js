import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'transactions.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      res.status(200).json(data);
    } catch {
      res.status(200).json([]);
    }
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      fs.writeFileSync(filePath, body);
      res.status(200).json({ success: true });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
