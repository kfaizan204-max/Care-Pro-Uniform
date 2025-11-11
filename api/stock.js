import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const stockFile = path.join(process.cwd(), 'data', 'stock.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = JSON.parse(await readFile(stockFile, 'utf-8'));
    return res.status(200).json(data);
  } else if (req.method === 'POST') {
    const stock = req.body;
    await writeFile(stockFile, JSON.stringify(stock, null, 2), 'utf-8');
    return res.status(200).json({ success: true });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
