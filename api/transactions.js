import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/transactions.json');

export default async function handler(req, res) {
  if(req.method === 'GET') {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.status(200).json(data);
  } 
  else if(req.method === 'POST') {
    const body = req.body; // new transaction
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    data.push(body);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(200).json({ success: true });
  } 
  else if(req.method === 'DELETE') {
    const { id } = req.query;
    let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    data = data.filter(t => t.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(200).json({ success: true });
  }
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
