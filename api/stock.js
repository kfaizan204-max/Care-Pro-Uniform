import fs from 'fs';
import path from 'path';

const stockFile = path.join(process.cwd(),'data','stock.json');

export default function handler(req,res){
  if(req.method==='GET'){
    const data = JSON.parse(fs.readFileSync(stockFile));
    res.status(200).json(data);
  } else if(req.method==='POST'){
    const newData = req.body;
    fs.writeFileSync(stockFile, JSON.stringify(newData,null,2));
    res.status(200).json({success:true});
  } else res.status(405).json({message:'Method not allowed'});
}
