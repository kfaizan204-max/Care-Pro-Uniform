import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'stock.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Read stock data
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
      }
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to read stock data' });
    }
  }

  else if (req.method === 'POST') {
    try {
      let body = '';
      req.on('data', chunk => (body += chunk));
      await new Promise(resolve => req.on('end', resolve));
      fs.writeFileSync(filePath, body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save stock data' });
    }
  }

  else {
    res.status(405).end();
  }
}
