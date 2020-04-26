var nodemailer = require('nodemailer'); 
var fetch = require('node-fetch');
var outlet = require('./data.js');
var schedule = require('node-schedule');

var count1 = 0;
var sent1 = false;
var allOutlets = {}
allOutlets.SPcheck = {"name":'SP', "count": 0, sent: false, Addr: 'http://spotouch.dyndns.org:8000/pingme'};
allOutlets.PJCCcheck = {"name": 'PJCC', "count": 0, "sent": false, "Addr": 'https://underfired-ibis-3986.dataplicity.io/pingme'};
allOutlets.PJ21check = {"name": 'PJ21', "count": 0, "sent": false, "Addr": 'https://membranous-molly-7085.dataplicity.io/pingme'};
allOutlets.BBBcheck = {"name": 'BBB', "count": 0, "sent": false, "Addr": 'http://dobidoo2.dyndns.biz:8000/pingme'};
allOutlets.TPScheck = {"name": 'TPS', "count": 0, "send": false, "Addr": 'http://dobidoo5.dyndns.biz:8000/pingme'};
allOutlets.TPJcheck = {"name": 'TPJ', "count": 0, "send": false, "Addr": 'http://washstudiotpj.ddns.me:8000/pingme'};
allOutlets.KPTcheck = {"name": 'KPT', "count": 0, "send": false, "Addr": 'http://washstudiokpt.ddns.me:8000/pingme'};
//allOutlets.DDNScheck = {"name": 'DDNS', "count": 0, "sent": false, "Addr": 'http://antlysis.ddns.net:333/pingme'};
allOutlets.ADAcheck = {"name": 'ADA', "count": 0, "sent": false, "Addr": 'http://o2washada.ddns.me:134/pingme'};
allOutlets.TSBcheck = {"name": 'TSB', "count": 0, "sent": false, "Addr": 'http://washstudiotsb.ddns.me:8000/pingme'};
allOutlets.SBScheck = {"name": 'SBS', "count": 0, "sent": false, "Addr": 'http://bubblelaundrettesbs.ddns.me:8000/pingme'};
allOutlets.PLSDcheck = {"name": 'PLSD', "count": 0, "sent": false, "Addr": 'http://bubblelaundretteplsd.ddns.me:8000/pingme'};
allOutlets.Laundrocheck = {"name": 'Laundro', "count": 0, "sent": false, "Addr": 'https://thelaundro.com/pingme'};
allOutlets.myWashStudioCheck = {"name": 'MyWashStudio', "count": 0, "sent": false, "Addr": 'https://mywashstudio.com/pingme'};

var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
        auth:{
                user: outlet.email,
                pass: outlet.gmailpw
        }
});

function pingMe(outletCheck) {
    var data = {"Online": "Yes"};
    fetch(outletCheck.Addr,
        {headers: {'Content-Type': 'application/json'},
        method:'POST',
        body:JSON.stringify(data)
    }).then(res => res.text())
    .catch(error => {
        console.error('Error:', error)
        console.log(outletCheck.name+" Server is Offline")
        if(!outletCheck.sent) {
            var mailOptions = {
                from: outlet.email,
                to: 'admin@antlysis.com',
                subject: outletCheck.name + ' server is Offline',
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
            		console.log(outletCheck.name+" Server is online")
            		if (outletCheck.sent) {
        		        var mailOptions = {
        	                from: outlet.email,
        	                to: 'admin@antlysis.com',
        	                subject: outletCheck.name +' server is online',
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
			console.log(outletCheck.name+" Server is Offline")
    	                var mailOptions = {
	                        from: outlet.email,
	                        to: 'admin@antlysis.com',
	                        subject: outletCheck.name+' server is Offline',
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
	Object.keys(allOutlets).forEach(function(key) {
		pingMe(allOutlets[key]);
	})   
}, 120000)
