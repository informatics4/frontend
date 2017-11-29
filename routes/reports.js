var express = require('express');
var request = require('request')
var router = express.Router();

/* GET reports listing. */
const url = 'https://cryptic-sands-49288.herokuapp.com/api/v1/'

router.get('/summary', function(req, res, next) {
    var personnel
    request.get(url+'logs/personnel', function(error,request,c_body){
        personnel = JSON.parse(c_body);
    })
    request(url+'logs/reports', function(error,request,a_body){
        reports = JSON.parse(a_body)
    
        res.pdfFromHTML({
            filename : 'something.pdf',
            htmlContent: `
                <center><h1>Security Report</h1></center>
                <hr>
                <center><h1>Personel</h1><center>
                <br>
                Security : ${personnel.security} <br>
                Students : ${personnel.students} <br>
                Staff : ${personnel.staff} <br>
                <hr>
                <center><h1>Report summary</h1><center>
                Numner of records : ${reports.all} <br>
                Normal activity : ${reports.normal/reports.all * 100} % <br>
                Suspicious activity : ${reports.suspicious/reports.all * 100} % <br>
                Warning activity : ${reports.warning/reports.all * 100} % <br>
                
            `
        })
      })
    
});

router.get('/logs', function(req,res,next){
    let t = []
    request.get(url+'logs', function(error,request,body){
        logs = JSON.parse(body);
        logs.forEach((element) => t.push(element))
        
        res.pdfFromHTML({
            filename : 'something.pdf',
            htmlContent: `
                <center><h1>Security logs Report</h1></center>
                <hr>
                ${JSON.stringify(t).replace('[','').replace('{', '').replace('},','\n')}
            `
        })
    })
})

module.exports = router;
