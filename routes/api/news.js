// let express=require("express");
// let router=express.Router();
// router.get("/",()=>{console.log("/api/news/dfdfddffgaga");})
// module.exports=router
let express = require('express')
let mgdb = require('../../utils/mgdb')

let router = express.Router()

// router.get('/',(req,res,next)=>console.log('news',req.query,req.body,req.headers))
//新闻列表
router.get('/:name',(req,res,next)=>{
  console.log(':name',req.params)
  console.log(req.query);

  //查询 处理 返回
  let collectionName = req.params.name;
  let {_page,_limit,_sort,q} = req.query;
  console.log(_limit);
  console.log(collectionName);
  mgdb.findList({
    collectionName,_page,_limit,_sort,q,
  }).then(
    result => res.send(result)
  ).catch(
    err=>res.send(err)
  )

})

//新闻详情
router.get('/:name/:_id',(req,res,next)=>{

  //查询 处理 返回
  let collectionName = req.params.name;
  let _id = req.params._id;
  //  console.log(collectionName,_id);
  mgdb.findDetail({
    collectionName,_id
  }).then(
    result => res.send(result)
  ).catch(
    err=>res.send(err)
  )

})


module.exports = router