const e = require("express");
let mongodb=require("mongodb");
let mongoCt=mongodb.MongoClient;
let ObjectId=mongodb.ObjectId;
let sql="2101";
//连接库
let open=({collectionName,dbName=sql,url="mongodb://127.0.0.1:27017"})=>{
     return new Promise((resolve,reject)=>{
         mongoCt.connect(url,{useUnifiedTopology: true},(err,client)=>{
             if(err){
                 reject({
                     err:0,
                     msg:"库链接失败",
                     data:"",
                 })
             }else{
                 let db=client.db(dbName);
                 let collection=db.collection(collectionName);
                 resolve({collection, client, ObjectId})
             }
         })
     })
};
//查询列表
let findList=({
    collectionName,dbName=sql,
    _page,_limit,_sort,q      
})=>{
    let rule = q ? { username: eval('/' + q + '/') } : {}
    return new Promise((resolve,reject)=>{
        open({collectionName,dbName}).then(({collection,client})=>{
            collection.find(rule,{
                skip:(_limit)*(_page),
                 limit:_limit,
                 projection:{},
                sort:{[_sort]:-1},              
            }).toArray((err,result)=>{
                if(!err && result.length>0){
                    resolve({
                        err:1,
                        msq:"成功查询",
                        data:result,
                    })
                }else{
                    resolve({
                        err:0,
                        msq:"没有数据",
                        data:"",
                    })
                }
                client.close();
            })
        }).catch(err=>{
            reject({
                err:0,
                msq:"库链接失败",
                data:"",
            })
            client.close();
        })
    })
};
//查询详情
let findDetail=({collectionName,dbName=sql,_id=null})=>{
 return new Promise((resolve,reject)=>{
     open({collectionName,dbName}).then(({
         collection ,client
     })=>{
         console.log(_id);
            if(_id.length===24){
            collection.find({_id:ObjectId(_id)},  
         {projection:{_id:0}}).toArray((err,result)=>{  
               if(!err && result.length>0){
                   console.log(1111);
                   resolve({
                       err:1,
                       msg:"查询成功",
                       data:result[0],
                   })
               }else{
                  resolve({
                       err:0,
                       msg:"没有数据",
                       data:"",
                   })
                   client.close();
               }
            })
           }else{
             reject({
                 err:0,
                 msg:"id有误",
                 data:"",
             })
             client.close();
           }
     }).catch(err=>{
         reject({
          err:0,
          msq:"库链接失败",
         })
         client.close();
     })
    })
};

exports.open =open;
exports.findList=findList;
exports.findDetail=findDetail;
