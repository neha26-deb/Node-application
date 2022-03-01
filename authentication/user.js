import db from '../datastore/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signUpUser = async (req, res, next) => {
    try{
        
        const name = req.body.name;
        const email = req.body.email;
        const response = await db.emailcheck(email);
        
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({msg: err});
            } else 
            {
              
              const password = hash;
              const result =  db.insertUser(name, email, password).then(insertId=>{return db.getOneUser(insertId);});
              if(result){                
                return res.status(201).send({msg: 'The user has been registered with us!'});
              }else{
                console.log(e);     
                return res.status(400).send({msg: err});   
              }
            }
        });

    } catch(e){
        console.log(e);     
        res.status(409).send({msg: 'This user is already in use!'});
    } 
};

export const loginUser = async (req, res, next) => {
  try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const result = await db.emailcheck(email);
        if (!result.length) 
        {
          return res.status(401).send({msg: 'email or password is incorrect!'});
        }
          // check password
        bcrypt.compare(req.body.password, result[0]['password'], (bErr, bResult) => {
             
            if (bErr) {
                console.log (bErr);
                return res.status(401).send({ msg: 'email or password is incorrect!'});
            }
            if (bResult) {
                const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
                const resId = result[0].id;
                // const updateLogin = db.updateLogin(resId);
                return res.status(200).send({
                  msg: 'Logged in!',
                  token,  
                  user: result[0]
                 });
            }
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
            
        
        });   
    } catch(e) {
        console.log(e);     
        return res.status(400).send({msg: err});
    }
};

export const logout = (req,res) => {
  req.session.destroy(function(err){
      if(!err){
          res.send("Log Out!")
      }
  })
};


