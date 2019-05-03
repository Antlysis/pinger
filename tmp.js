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
var count1 = 0;
var sent2 = false;
var count2 = 0;
var sent3 = false;
var count3 = 0;
var sent4 = false;
var count4 = 0;
var sent5 = false;
var count5 = 0;
var sent8 = false;
var count8 = 0;
var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
        auth:{
                user: outlet.email,
                pass: outlet.gmailpw
        }
});

function pingSP() {
        var data = {"Online": "Yes"};
        fetch('https://aortic-sheep-0060.dataplicity.io/pingme',
                {headers: {'Content-Type': 'application/json'},
                method:'POST',
                body:JSON.stringify(data)
        }).then(res => res.text())
        .catch(error => {
                console.error('Error:', error)
                console.log("SP Server is Offline")
                if(!sent1) {
                        var mailOptions = {
                                from: outlet.email,
                                to: 'admin@antlysis.com',
                                subject: 'SP server is Offline',
                                text: "Server status sent by Pinger"
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                        console.log(error);
                                } else {
                                        console.log('Email sent: ' + info.response);
                                }
                        });
                        sent1 = true;
                }

        })
        .then(response => {
                console.log('Success:', response)
                var status = JSON.parse(response).status
                if (status == "Online") {
                        console.log("SP Server is online")
                        if (sent1) {
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
                                sent1 = false;
                        }
			count1 = 0;
                } else {
			count1++;
			if (count1 == 4) {
				if(!sent1) {
                        		var mailOptions = {
                                		from: outlet.email,
                               			to: 'admin@antlysis.com',
                                		subject: 'SP server is Offline',
                                		text: "Server status sent by Pinger"
                        		};
                        		transporter.sendMail(mailOptions, function(error, info){
                                		if (error) {
                                		        console.log(error);
                                		} else {
                                		        console.log('Email sent: ' + info.response);
                                		}
                        		});
                        		sent1 = true;
                		}
			}
		}
                //myRefreshToken = response.refreshToken
        })
}

function pingPJCC() {
        var data = {"Online": "Yes"};
        fetch('https://underfired-ibis-3986.dataplicity.io/pingme',
                {headers: {'Content-Type': 'application/json'},
                method:'POST',
                body:JSON.stringify(data)
        }).then(res => res.text())
        .catch(error => {
                console.error('Error:', error)
                console.log("PJCC Server is Offline")
                if(!sent2) {
                        var mailOptions = {
                                from: outlet.email,
                                to: 'admin@antlysis.com',
                                subject: 'PJCC server is Offline',
                                text: "Server status sent by Pinger"
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                        console.log(error);
                                } else {
                                        console.log('Email sent: ' + info.response);
                                }
                        });
                        sent2 = true;
                }

        })
        .then(response => {
                console.log('Success:', response)
                var status = JSON.parse(response).status
                if (status == "Online") {
                        console.log("PJCC Server is online")
                        if (sent2) {
                                var mailOptions = {
                                        from: outlet.email,
                                        to: 'admin@antlysis.com',
                                        subject: 'PJCC server is online',
                                        text: "Server status sent by Pinger"
                                };
                                transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                                console.log(error);
                                        } else {
                                                console.log('Email sent: ' + info.response);
                                        }
                                });
                                sent2 = false;
                        }
			count2 = 0
                } else {
                        count2++;
                        if (count2 == 4) {
                                if(!sent2) {
                                        var mailOptions = {
                                                from: outlet.email,
                                                to: 'admin@antlysis.com',
                                                subject: 'PJCC server is Offline',
                                                text: "Server status sent by Pinger"
                                        };
                                        transporter.sendMail(mailOptions, function(error, info){
                                                if (error) {
                                                        console.log(error);
                                                } else {
                                                        console.log('Email sent: ' + info.response);
                                                }
                                        });
                                        sent2 = true;
                                }
                        }
                }
                //myRefreshToken = response.refreshToken
        })
}

function pingPJ21() {
        var data = {"Online": "Yes"};
        fetch('https://membranous-molly-7085.dataplicity.io/pingme',
                {headers: {'Content-Type': 'application/json'},
                method:'POST',
                body:JSON.stringify(data)
        }).then(res => res.text())
        .catch(error => {
                console.error('Error:', error)
                console.log("PJ21 Server is Offline")
                 if(!sent3) {
                        var mailOptions = {
                                from: outlet.email,
                                to: 'admin@antlysis.com',
                                subject: 'PJ21 server is Offline',
                                text: "Server status sent by Pinger"
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                        console.log(error);
                                } else {
                                        console.log('Email sent: ' + info.response);
                                }
                        });
                        sent3 = true;
                }

        })
        .then(response => {
                console.log('Success:', response)
                var status = JSON.parse(response).status
                if (status == "Online") {
                        console.log("PJ21 Server is online")
                        if (sent3) {
                                var mailOptions = {
                                        from: outlet.email,
                                        to: 'admin@antlysis.com',
                                        subject: 'PJ21 server is online',
                                        text: "Server status sent by Pinger"
                                };
                                transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                                console.log(error);
                                        } else {
                                                console.log('Email sent: ' + info.response);
                                        }
                                });
                                sent3 = false;
                        }
			count3 = 0
                } else {
                        count3++;
                        if (count3 == 4) {
                                if(!sent3) {
                                        var mailOptions = {
                                                from: outlet.email,
                                                to: 'admin@antlysis.com',
                                                subject: 'PJ21 server is Offline',
                                                text: "Server status sent by Pinger"
                                        };
                                        transporter.sendMail(mailOptions, function(error, info){
                                                if (error) {
                                                        console.log(error);
                                                } else {
                                                        console.log('Email sent: ' + info.response);
                                                }
                                        });
                                        sent3 = true;
                                }
                        }
                }
                //myRefreshToken = response.refreshToken
        })
}

function pingBBB() {
        var data = {"Online": "Yes"};
        fetch('https://coronate-pademelon-4727.dataplicity.io/pingme',
                {headers: {'Content-Type': 'application/json'},
                method:'POST',
                body:JSON.stringify(data)
        }).then(res => res.text())
        .catch(error => {
                console.error('Error:', error)
                console.log("BBB Server is Offline")
                if(!sent4) {
                        var mailOptions = {
                                from: outlet.email,
                                to: 'admin@antlysis.com',
                                subject: 'BBB server is Offline',
                                text: "Server status sent by Pinger"
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                        console.log(error);
                                } else {
                                        console.log('Email sent: ' + info.response);
                                }
                        });
                        sent4 = true;
                }
        })
        .then(response => {
                console.log('Success:', response)
                var status = JSON.parse(response).status
                if (status == "Online") {
                        console.log("BBB Server is online")
                        if (sent4) {
                                var mailOptions = {
                                        from: outlet.email,
                                        to: 'admin@antlysis.com',
                                        subject: 'BBB server is online',
                                        text: "Server status sent by Pinger"
                                };
                                transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                                console.log(error);
                                        } else {
                                                console.log('Email sent: ' + info.response);
                                        }
                                });
                                sent4 = false;
                        }
			count4
                } else {
                        count4++;
                        if (count4 == 4) {
                                if(!sent4) {
                                        var mailOptions = {
                                                from: outlet.email,
                                                to: 'admin@antlysis.com',
                                                subject: 'BBB server is Offline',
                                                text: "Server status sent by Pinger"
                                        };
                                        transporter.sendMail(mailOptions, function(error, info){
                                                if (error) {
                                                        console.log(error);
                                                } else {
                                                        console.log('Email sent: ' + info.response);
                                                }
                                        });
                                        sent4 = true;
                                }
                        }
                }
                //myRefreshToken = response.refreshToken
        })
}

function pingddns() {
        var data = {"Online": "Yes"};
        fetch('http://antlysis.ddns.net:333/pingme',
                {headers: {'Content-Type': 'application/json'},
                method:'POST',
                body:JSON.stringify(data)
        }).then(res => res.text())
        .catch(error => {
                console.error('Error:', error)
                console.log("DDNS Server is Offline")
                if(!sent8) {
                        var mailOptions = {
                                from: outlet.email,
                                to: 'admin@antlysis.com',
                                subject: 'DDNS server is Offline',
                                text: "Server status sent by Pinger"
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                        console.log(error);
                                } else {
                                        console.log('Email sent: ' + info.response);
                                }
                        });
                        sent8 = true;
                }

        })
        .then(response => {
                //console.log('Success:', response)
                var status = JSON.parse(response).status
                if (status == "Online") {
                        console.log("DDNS Server is online")
                        if (sent8) {
                                var mailOptions = {
                                        from: outlet.email,
                                        to: 'admin@antlysis.com',
                                        subject: 'DDNS server is online',
                                        text: "Server status sent by Pinger"
                                };
                                transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                                console.log(error);
                                        } else {
                                                console.log('Email sent: ' + info.response);
                                        }
                                });
                                sent8 = false;
                        }
			count8 = 0
		} else {
                        count8++;
                        if (count8 == 4) {
                                if(!sent8) {
                                        var mailOptions = {
                                                from: outlet.email,
                                                to: 'admin@antlysis.com',
                                                subject: 'DDNS server is Offline',
                                                text: "Server status sent by Pinger"
                                        };
                                        transporter.sendMail(mailOptions, function(error, info){
                                                if (error) {
                                                        console.log(error);
                                                } else {
                                                        console.log('Email sent: ' + info.response);
                                                }
                                        });
                                        sent8 = true;
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
        pingSP();
        pingPJCC();
        pingPJ21();
        pingBBB();
	pingddns();
        //pingTest();
}, 120000)


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
