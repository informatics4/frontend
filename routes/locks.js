var express = require('express')

var router = express.Router();

router.get('/', function(req,res,next){
    res.render('locks');
})

module.exports = router;