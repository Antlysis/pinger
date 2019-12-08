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
var ADAcheck = {};
ADAcheck.count = 0;
ADAcheck.sent = false;
var TSBcheck = {};
TSBcheck.count = 0;
TSBcheck.sent = false;
var SBScheck = {};
SBScheck.count = 0;
SBScheck.sent = false;
var PLSDcheck = {};
PLSDcheck.count = 0;
PLSDcheck.sent = false;
const SPAddr = 'https://aortic-sheep-0060.dataplicity.io/pingme';
const PJCCAddr = 'https://underfired-ibis-3986.dataplicity.io/pingme';
const PJ21Addr = 'https://membranous-molly-7085.dataplicity.io/pingme';
const BBBAddr = 'https://coronate-pademelon-4727.dataplicity.io/pingme';
const DDNSAddr = 'http://antlysis.ddns.net:333/pingme';
const ADAAddr = 'http://o2washada.ddns.me:134/pingme';
const TSBAddr = 'http://washstudiotsb.ddns.me:8000/pingme';
const SBSAddr = 'http://bubblelaundrettesbs.ddns.me:8000/pingme';
const PLSDAddr = 'http://bubblelaundretteplsd.ddns.me:8000/pingme';
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
        console.log('Success:', response)
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
        	                subject: name +' server is online',
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
			console.log(name+" Server is Offline")
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
    //pingMe(DDNSAddr, DDNScheck, "DDNS");
    pingMe(ADAAddr, ADAcheck, "ADA");
    pingMe(TSBAddr, TSBcheck, "TSB");
    pingMe(PLSDAddr, PLSDcheck, "PLSD");
    pingMe(SBSAddr, SBScheck, "SBS");
}, 120000)
