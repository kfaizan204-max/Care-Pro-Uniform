const fs = require('fs');
const DATA_FILE = './api/data.json';

export default function handler(req, res){
  let data = JSON.parse(fs.readFileSync(DATA_FILE));
  if(req.method === 'GET'){
    res.status(200).json(data.stock);
  } else if(req.method === 'POST'){
    data.stock = JSON.parse(req.body);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.status(200).json({ success:true });
  } else res.status(405).json({ error:'Method Not Allowed' });
}
