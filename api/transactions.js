const fs = require('fs');
const DATA_FILE = './api/data.json';

export default function handler(req,res){
  let data = JSON.parse(fs.readFileSync(DATA_FILE));
  if(req.method === 'GET'){
    res.status(200).json(data.transactions);
  } else if(req.method === 'POST'){
    const entry = JSON.parse(req.body);
    data.transactions.unshift(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data,null,2));
    res.status(200).json({ success:true });
  } else if(req.method === 'DELETE'){
    const url = new URL(req.url, 'http://localhost'); 
    const id = url.searchParams.get('id');
    data.transactions = data.transactions.filter(t=>t.id!=id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data,null,2));
    res.status(200).json({ success:true });
  } else res.status(405).json({ error:'Method Not Allowed' });
}
