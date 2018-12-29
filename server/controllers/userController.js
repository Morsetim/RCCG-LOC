import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import env from 'dotenv';
import db from '../models/db';

env.config();

class UserController{




signUp(req, res) {
  const {fullname, email} = req.body;
  const hash = bcrypt.hashSync(req.body.password, 10);
  db.query(`SELECT id FROM users WHERE email = '${email}' OR fullname = '${fullname}'`)
  .then((userfind) =>{
    if(userfind.rows.length == 1){
      return res.status(409)
            .json({
              status: 'Failed',
              message: 'User Already Exist'
            });
    }
    const sql = 'INSERT INTO users(fullname, email, password) VALUES($1, $2, $3) RETURNING *';
    const params = [fullname, email, hash];
    db.query(sql, params)
    .then((member) =>{
      return res.status(201)
              .json({
                status: 'Success',
                message: 'Successfully created RCCG-LOC account',
                memberData: member.rows[0]
              });
    }).catch(err => res.status(500).json({status:'Failed', message:err.message}));
  }).catch(err => res.status(500).json({status:'Failed', message:err.message}));
}

  signIn(req, res){
    const {email, password} = req.body;
    db.query(`SELECT * FROM users WHERE email = '${email}'`).then((member) =>{
      if(member.rows.length == 1){
      const checkHash = bcrypt.compareSync(password, member.rows[0].password);
      if(checkHash){
        const payload ={
          fullname:member.rows[0].fullname,
          email,
          memberId: member.rows[0].id
        };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 10}); // Expires in 10 hours
      req.token = token;
      return res.status(201)
              .json({
                status: 'Success',
                message: 'Successfully signed in',
                memberData: member.rows[0],
                token
              });
      }
      }
      return res.status(400)
                .json({
                  status: 'Failed',
                  message: 'Invalid Email or Password'
    });
    }).catch(err =>res.status(500).json({status:'Failed', message:err.message}));
  }

}


export default new UserController();