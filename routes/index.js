var express = require('express');
var router = express.Router();
// var bcrypt=require("../utils/bcrypt")
// var  jwt=require("../utils/jwt")
var mgdb=require("../utils/mgdb")
 /*获取主页*/
router.all('/', (req, res, next) => {
    // console.log(req.body);
//  console.log(req.quire.password);
// console.log("bcrypt",bcrypt.hashSync(req.body.password));
// let hash =  bcrypt.hashSync(req.body.password);
//   console.log(hash);
//  console.log( "bcrypt.compareSync",bcrypt.compareSync(req.body.password,hash));
//  let token=jwt.sign({username:"zs",_id:11111111});
//  console.log(token);
//     jwt.verify(token).then(data=>{
//       console.log(data);
//     }).catch(err=>{
//       console.log(err);
//     })
// mgdb.open({collectionName:"user"}).then(
//   ({collection,client})=>collection.insertOne({name:"刘峰",password:1234567,liname:"小李",icon:"3.jpg"},(err,res)=>{
//     console.log("res",res.result.n);
//     console.log("res", res.ops);
//     console.log("res",res.insertedId);
//     client.close();
//   }))
 mgdb.findList({collectionName:"user",_limit:1}).then(res=>console.log(res))});
module.exports = router;
