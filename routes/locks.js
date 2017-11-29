var express = require('express')
var request = require('request')
const firebase = require('firebase')

var router = express.Router();

var config = {
    apiKey: "AIzaSyBHHXfc9-TGQqGBoHYzT5pVe1lT13bBCLg",
    authDomain: "fourthyear-d5634.firebaseapp.com",
    databaseURL: "https://fourthyear-d5634.firebaseio.com",
    projectId: "fourthyear-d5634",
    storageBucket: "fourthyear-d5634.appspot.com",
    messagingSenderId: "127657070211"
  };

  var app = firebase.initializeApp(config)
  
  var database  = firebase.database();
  const url = 'https://cryptic-sands-49288.herokuapp.com/api/v1/'
router.get('/', function(req,res,next){
    var lockStatsRef = database.ref('lock').once('value').then(function(snapshot){
        let data = snapshot.val()
        res.render('locks', {data : data})
    })
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

router.post('/open', function(req,res,next){
    formData = {
        room : req.body.room,
        action : req.body.action 
    }
    saveToFirebase(formData)
    res.redirect('/locks')
})

router.post('/lock', function(req,res,next){
    formData = {
        room : req.body.room,
        action : req.body.action 
    }
    saveToFirebase(formData)
    res.redirect('/locks')
})

function saveToFirebase(message) {
    database.ref('lock/'+message.room).set(message)
}

router.post('/alarm', function(req,res,next){
    formData = {
      location : req.body.location,
      status : req.body.status 
    }
  
    request.put({url : url+'alarms/'+req.body.id, formData:formData}, function(err, httpResponse, body){
      if(err) throw err
      database.ref('alarm/'+req.body.location).set(formData)
      res.redirect('/')
    })
    

})

module.exports = router;