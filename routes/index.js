var express = require('express')
var request = require('request')
var router = express.Router();

/* GET home page. */
const url = 'https://cryptic-sands-49288.herokuapp.com/api/v1/'

router.get('/', function(req, res, next) {
  var obj
  var repObj
  var alarms
  request.get(url+'logs/personnel', function(error,request,c_body){
    obj = JSON.parse(c_body);
  })
  request.get(url+'alarms', function(error,request,a_body){
    alarms = JSON.parse(a_body)
  })
  request.get(url+'logs/reports', function(error,request,body){
    repObj = JSON.parse(body)
    let norm = 'width: '+(repObj.normal / repObj.all)*100+'%' 
    let sus = 'width: '+(repObj.suspicious / repObj.all)*100+'%' 
    let warn = 'width: '+(repObj.warning / repObj.all)*100+'%' 
    res.render('index', {p : obj, alarms : alarms, n : norm, w : warn, s : sus});
  })

  
  
});



module.exports = router;
