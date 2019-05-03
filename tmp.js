var express = require('express');
var app = express();
var server = require('http').Server(app)
//Loading the crypto module in node.js
var crypto = require('crypto');
var nodemailer = require('nodemailer'); 
var fetch = require('node-fetch');
var outlet = require('./data.js');
var schedule = require('node-schedule');

var count1 = 0;
var sent1 = false;
var SPcheck = {};
SPcheck.count = 0;
SPcheck.sent = false;
var PJCCcheck = {};
PJCCcheck.count = 0;
PJCCcheck.sent = false;
var PJ21check = {};
PJ21check.count = 0;
PJ21check.sent = false;
var BBBcheck = {};
BBBcheck.count = 0;
BBBcheck.sent = false;
var DDNScheck = {};
DDNScheck.count = 0;
DDNScheck.sent = false;
const SPAddr = 'https://aortic-sheep-0060.dataplicity.io/pingme';
const PJCCAddr = 'https://underfired-ibis-3986.dataplicity.io/pingme';
const PJ21Addr = 'https://membranous-molly-7085.dataplicity.io/pingme';
const BBBAddr = 'https://coronate-pademelon-4727.dataplicity.io/pingme';
const DDNSAddr = 'http://antlysis.ddns.net:333/pingme';
var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
        auth:{
                user: outlet.email,
                pass: outlet.gmailpw
        }
});

function pingMe(addr, outletCheck, name) {
    var data = {"Online": "Yes"};
    fetch(addr,
        {headers: {'Content-Type': 'application/json'},
        method:'POST',
        body:JSON.stringify(data)
    }).then(res => res.text())
    .catch(error => {
        console.error('Error:', error)
        console.log(name+" Server is Offline")
        if(!outletCheck.sent) {
            var mailOptions = {
                from: outlet.email,
                to: 'admin@antlysis.com',
                subject: name + ' server is Offline',
                text: "Server status sent by Pinger"
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                        console.log(error);
                } else {
                        console.log('Email sent: ' + info.response);
                }
            });
            outletCheck.sent = true;
        }

    })
    .then(response => {
            //console.log('Success:', response)
        if(response) {
        	try {
        		//console.log("checked")
        		var status = JSON.parse(response).status;
        		//console.log(status)
        		if (status == "Online") {
            		console.log(name+" Server is online")
            		if (outletCheck.sent) {
        		        var mailOptions = {
        	                from: outlet.email,
        	                to: 'admin@antlysis.com',
        	                subject: 'SP server is online',
        	                text: "Server status sent by Pinger"
        		        };
        		        transporter.sendMail(mailOptions, function(error, info){
        	                if (error) {
        	                        console.log(error);
        	                } else {
        	                        console.log('Email sent: ' + info.response);
        	                }
        		        });
                        outletCheck.sent = false;
            		}
                    outletCheck.count = 0;
        		}
        	}
        	catch (e) {
    			console.error(e); // error in the above string (in this case, yes)!
            	if (outletCheck.count <= 2) {
        	        if(!outletCheck.sent) {
    	                var mailOptions = {
	                        from: outlet.email,
	                        to: 'admin@antlysis.com',
	                        subject: name+' server is Offline',
	                        text: "Server status sent by Pinger"
    	                };
    	                transporter.sendMail(mailOptions, function(error, info){
	                        if (error) {
	                                console.log(error);
	                        } else {
	                                console.log('Email sent: ' + info.response);
	                        }
    	                });
    	                outletCheck.sent = true;
        	        }
                    outletCheck.count++
            	}
            }	   
	    }
    })
}

schedule.scheduleJob('00 00 00 * * *', function(){
        var mailOptions = {
                from: outlet.email,
                to: 'admin@antlysis.com',
                subject: 'Pinger server is online',
                text: "Pinger is still working hard to monitor our servers."
        };
        transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                        console.log(error);
                } else {
                        console.log('Email sent: ' + info.response);
                }
        });
})

setInterval(function() {
    pingMe(SPAddr, SPcheck, "SP");
    pingMe(PJCCAddr, PJCCcheck, "PJCC");
    pingMe(PJ21Addr, PJ21check, "PJ21");
    pingMe(BBBAddr, BBBcheck, "BBB");
    pingMe(DDNSAddr, DDNScheck, "DDNS");
}, 10000)

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
})

app.get('/token',function (req, res) {
   console.log(req.query);
   let signature = req.query.signature,
       timestamp = req.query.timestamp,
       nonce = req.query.nonce,
       echostr = req.query.echostr,
       pushToken = 'pushToken';
   let a = crypto.createHash('sha1').update([pushToken, timestamp, nonce].sort().join('')).digest('hex');  // 这里的pushToken就是在上面的那里配置的Token
 
   if(a == signature){
     // 如果验证成功则原封不动的返回
     res.send(echostr);
   }else{
     res.send({
       status: 400,
       data: "check msg error"
     })
   }
});

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

//app.listen
server.listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');
