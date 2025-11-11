const fs = require('fs');
const USERS = [{ id: 'admin', password: '1234' }];

export default function handler(req, res) {
  if(req.method === 'POST'){
    const body = JSON.parse(req.body);
    const user = USERS.find(u => u.id === body.id && u.password === body.password);
    res.status(200).json({ success: !!user });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
