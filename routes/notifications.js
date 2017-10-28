var express = require('express')
var request = require('request')

var router = express.Router();

router.get('/', function(req,res,next){
    request('https://cryptic-sands-49288.herokuapp.com/api/v1/notifications', function(error,request,body){
        let obj = JSON.parse(body)
        res.render('notifications', {data : obj});
    })
})

router.post('/', function(req,res,next){
    formData = {
        case : req.body.case,
        notify : req.body.notify
    }
    request.post({url : 'https://cryptic-sands-49288.herokuapp.com/api/v1/notifications', formData:formData}, function(err, httpResponse, body){
        if(err) throw err
        res.redirect('/notifications')
    })
})

module.exports = router;