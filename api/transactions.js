import fs from 'fs';
import path from 'path';

const transFile = path.join(process.cwd(),'data','transactions.json');

export default function handler(req,res){
  if(req.method==='GET'){
    const data = JSON.parse(fs.readFileSync(transFile));
    res.status(200).json(data);
  } else if(req.method==='POST'){
    const entry = req.body;
    const data = JSON.parse(fs.readFileSync(transFile));
    data.unshift(entry);
    fs.writeFileSync(transFile, JSON.stringify(data,null,2));
    res.status(200).json({success:true});
  } else if(req.method==='DELETE'){
    const id = req.url.split('/').pop();
    let data = JSON.parse(fs.readFileSync(transFile));
    const entry = data.find(t=>t.id===id);
    if(entry){
      const stockFile = path.join(process.cwd(),'data','stock.json');
      const stock = JSON.parse(fs.readFileSync(stockFile));
      const row = stock.find(r=>r.Item===entry.item && r.Size===entry.size);
      if(row) row.Quantity += entry.qty;
      fs.writeFileSync(stockFile, JSON.stringify(stock,null,2));
    }
    data = data.filter(t=>t.id!==id);
    fs.writeFileSync(transFile, JSON.stringify(data,null,2));
    res.status(200).json({success:true});
  } else res.status(405).json({message:'Method not allowed'});
}
