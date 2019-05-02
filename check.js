var nodemailer = require('nodemailer'); 
var fetch = require('node-fetch');
var outlet = require('./data.js');
var schedule = require('node-schedule');

var count1 = 0;
var sent1 = false;
var sent2 = false;
var sent3 = false;
var sent4 = false;
var sent5 = false;

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
	}).then(res => res.json())
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
		//console.log('Success:', response)
		var status = response.status
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
        }).then(res => res.json())
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
                //console.log('Success:', response)
                var status = response.status
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
        }).then(res => res.json())
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
                //console.log('Success:', response)
                var status = response.status
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
        }).then(res => res.json())
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
                //console.log('Success:', response)
                var status = response.status
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
		}
                //myRefreshToken = response.refreshToken
        })
}

function pingTest() {
        var data = {"Online": "Yes"};
        fetch('https://overshot-wolf-2024.dataplicity.io/pingme',
                {headers: {'Content-Type': 'application/json'},
                method:'POST',
                body:JSON.stringify(data)
        }).then(res => res.json())
        .catch(error => {
                console.error('Error:', error)
                console.log("Test Server is Offline")
                if(!sent5) {
                        var mailOptions = {
                                from: outlet.email,
                                to: 'admin@antlysis.com',
                                subject: 'Test server is Offline',
                                text: "Server status sent by Pinger"
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                        console.log(error);
                                } else {
                                        console.log('Email sent: ' + info.response);
                                }
                        });
                        sent5 = true;
                }
        })
        .then(response => {
                //console.log('Success:', response)
                var status = response.status
                if (status == "Online") {
                        console.log("Test Server is online")
                        if (sent5) {
                                var mailOptions = {
                                        from: outlet.email,
                                        to: 'admin@antlysis.com',
                                        subject: 'Test server is online',
                                        text: "Server status sent by Pinger"
                                };
                                transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                                console.log(error);
                                        } else {
                                                console.log('Email sent: ' + info.response);
                                        }
                                });
                                sent5 = false;
                        }
                }
                //myRefreshToken = response.refreshToken
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
	//pingTest();
}, 300000)
