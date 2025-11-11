export default function handler(req, res) {
  if(req.method==='POST'){
    const {id,password} = req.body;
    const USERS = [{id:'admin', password:'1234'}]; // Add more users if needed
    const user = USERS.find(u=>u.id===id && u.password===password);
    if(user) res.status(200).json({success:true});
    else res.status(200).json({success:false});
  } else {
    res.status(405).json({message:'Method not allowed'});
  }
}
