import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/stock.json');

export default async function handler(req, res) {
  if(req.method === 'GET') {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.status(200).json(data);
  } 
  else if(req.method === 'POST') {
    const body = req.body;
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
    res.status(200).json({ success: true });
  } 
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
