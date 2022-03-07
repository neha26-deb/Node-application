import db from '../datastore/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';




export const signUpUser = async (req, res, next) => {
    try{
        
        const name = req.body.name;
        const email = req.body.email;
        const role = req.body.role;

        const response = await db.emailcheck(email);
        
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({msg: err});
            } else 
            {
              
              const password = hash;
              const result =  db.insertUser(name, role, email, password).then(insertId=>{return db.getOneUser(insertId);});
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
                const token = jwt.sign({user:{id:result[0].id, role:result[0].role, name:result[0].name}},'the-super-strong-secrect',{ expiresIn: '1h' });
                res.cookie('token', token); 
                const resId = result[0].id;
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

export const verifyToken  = async (req, res, next) => {
  try{  
    const {token} = req.cookies;
    console.log(token);
    if(!(token === undefined)){
        jwt.verify(token, 'the-super-strong-secrect', (err, authData)=>{
           if(err){
             console.log(err);
               res.json({
                   message: "Invalid Token..."
                  });

            } else{
              req.session.user = authData.user;
              console.log(authData.user.role);
              const role = authData.user.role;
              if(role === "Admin")
              {
                next();
              } 
               else
              {
                return res.json({
                  message: "Access Denied! you are not an Admin"
                });
              }
              
            }
        })
     }
  }catch(e) {
    console.log(e);     
    return res.status(400).json({
      message: "Access Denied! Unauthorized User"
    });
}

};




export const logout = (req,res) => {
  req.session.destroy(function(err){
      if(!err){
          res.send("You are logged out!")
      }
  })
};


