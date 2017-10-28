var express = require('express')
var request = require('request')

var router = express.Router();

router.get('/', function(req,res,next){

    request('https://cryptic-sands-49288.herokuapp.com/api/v1/contacts', function(error,request,body){
        let obj = JSON.parse(body)
        res.render('contacts', {data : obj});
    })
})

router.post('/', function(req,res,next){
    formData = {
        email : req.body.email,
        phoneNumber : req.body.phoneNumber,
        role : req.body.role
    }
    request.post({url:'https://cryptic-sands-49288.herokuapp.com/api/v1/contacts', formData:formData}, function(err, httpResponse, body){
        if(err) throw err
        res.redirect('/contacts')
    })
})

module.exports = router;