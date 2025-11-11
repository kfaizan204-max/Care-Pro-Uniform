const express=require('express');
const fs=require('fs');
const cors=require('cors');
const app=express();
const port=process.env.PORT||3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const DATA_FILE='data.json';
const USERS=[{id:'admin',password:'1234'}];

function loadData(){
  if(!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({stock:[],transactions:[]}));
  return JSON.parse(fs.readFileSync(DATA_FILE));
}
function saveData(data){ fs.writeFileSync(DATA_FILE, JSON.stringify(data,null,2));}

// login
app.post('/api/login',(req,res)=>{
  const {id,password}=req.body;
  const user=USERS.find(u=>u.id===id && u.password===password);
  res.json({success: !!user});
});

// stock routes
app.get('/api/stock',(req,res)=>{ res.json(loadData().stock); });
app.post('/api/stock',(req,res)=>{ 
  const data=loadData();
  data.stock=req.body;
  saveData(data);
  res.json({success:true});
});

// transaction routes
app.get('/api/transactions',(req,res)=>{ res.json(loadData().transactions); });
app.post('/api/transactions',(req,res)=>{
  const data=loadData();
  data.transactions.unshift(req.body);
  saveData(data);
  res.json({success:true});
});
app.delete('/api/transactions/:id',(req,res)=>{
  const data=loadData();
  data.transactions=data.transactions.filter(t=>t.id!=req.params.id);
  saveData(data);
  res.json({success:true});
});

app.listen(port,()=>console.log('Server running on port',port));
