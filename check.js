var nodemailer = require('nodemailer'); 
const isReachable = require('is-reachable');

var count1 = 0;
var sent = true;

var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
                user: 'ptutm.jameslsk@gmail.com',
                pass: 'james009'
        }
});

function checkPJ21 () {
	isReachable('https://rugulose-akita-0733.dataplicity.io/').then(function(reachable){
		console.log(reachable);
		if (reachable == false) {
			count1++;
			if (count <= 10) {
				var mailOptions = {
		        		from: 'ptutm.jameslsk@gmail.com',
        				to: 'jamesleesukey@gmail.com',
        				subject: 'Sending Email to notify that the PJ21 server is unreachable at the moment',
        				text: "the server has been down for " + count1
				};
				transporter.sendMail(mailOptions, function(error, info){
        	        		if (error) {
        	        			console.log(error);
        	               		} else {
        	                	       console.log('Email sent: ' + info.response);
        	              		}
        	       		});
			}
			sent = false;
		} else if (reachable == true) {
			if (sent == true) {
			} else {
				var mailOptions = {
        	                	from: 'ptutm.jameslsk@gmail.com',
        	                	to: 'jamesleesukey@gmail.com',
        	                	subject: 'Sending Email to notify that PJ21 server has back to normal condition',
        	                	text: "the server is up now"
        	        	};
        	        	transporter.sendMail(mailOptions, function(error, info){
        	                	if (error) {
        	                        	console.log(error);
        	                	} else {
        	                       		console.log('Email sent: ' + info.response);
        	                	}
        	        	});
				sent = true;
			}
		}
		//=> true
	})
}

function checkPJCC () {
        isReachable('https://rugulose-akita-0733.dataplicity.io/').then(function(reachable){
                console.log(reachable);
                if (reachable == false) {
                        count1++;
                        if (count <= 10) {
                                var mailOptions = {
                                        from: 'ptutm.jameslsk@gmail.com',
                                        to: 'jamesleesukey@gmail.com',
                                        subject: 'Sending Email to notify that the PJCC server is unreachable at the moment',
                                        text: "the server has been down for " + count1
                                };
                                transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                                console.log(error);
                                        } else {
                                               console.log('Email sent: ' + info.response);
                                        }
                                });
                        }
                        sent = false;
                } else if (reachable == true) {
                        if (sent == true) {
                        } else {
                                var mailOptions = {
                                        from: 'ptutm.jameslsk@gmail.com',
                                        to: 'jamesleesukey@gmail.com',
                                        subject: 'Sending Email to notify that PJCC server has back to normal condition',
                                        text: "the server is up now"
                                };
                                transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                                console.log(error);
                                        } else {
                                                console.log('Email sent: ' + info.response);
                                        }
                                });
                                sent = true;
                        }
                }
                //=> true
        })
}


setInterval(checkPJCC, 60000);
setInterval(checkPJ21, 60000);

//isReachable('google.com:80').then(reachable => {
//	console.log(reachable);
	//=> true
//});
