let  jwt = require("jsonwebtoken");
module.exports={
  sign:({username,_id})=>jwt.sign({username,_id},"2101",{expiresIn:60*60*24}),
  verify:token => { return new Promise((resolve,reject)=>{
      jwt.verify(token,"2101",(err,docode)=>{
          if(!err){
            resolve(docode)
          }else{
            reject(err.message )
          }
        }
        )}
        )}
}