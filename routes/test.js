var express = require('express');
var router = express.Router();

/* 获取用户列表。 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
