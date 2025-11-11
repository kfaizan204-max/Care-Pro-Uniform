import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'transactions.json');

export default async function handler(req, res) {
  let data = JSON.parse(await readFile(filePath, 'utf-8'));

  if (req.method === 'GET') {
    return res.status(200).json(data);
  } else if (req.method === 'POST') {
    const newEntry = req.body;
    data.push(newEntry);
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return res.status(200).json({ success: true });
  } else if (req.method === 'DELETE') {
    const id = req.url.split('/').pop();
    data = data.filter(t => t.id !== id);
    await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return res.status(200).json({ success: true });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
