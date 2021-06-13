let bcrypt = require('bcrypt');
module.exports={
    hashSync:password => hash = bcrypt.hashSync(password, 10),
    compareSync:(sendPassword,hash)=>bcrypt.compareSync(sendPassword,hash),// true|false
}