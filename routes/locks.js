var express = require('express')
var request = require('request')

var router = express.Router();

router.get('/', function(req,res,next){
    res.render('locks');
})

router.post('/', function(req,res,next){
    formData = {
        room : req.body.room,
        case : req.body.case,
        action : req.body.action
    }
    request.post({url : 'https://cryptic-sands-49288.herokuapp.com/api/v1/commands', formData:formData}, function(err, httpResponse, body){
        if(err) throw err
        res.redirect('/locks')
    })
})

module.exports = router;