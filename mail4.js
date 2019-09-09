var Imap = require("imap");
var MailParser = require("mailparser").MailParser;
var Promise = require("bluebird");
//var subject=require('./mail3');
Promise.longStackTraces();

var imapConfig = {
    user: 'ramasuravarapu46@gmail.com',
    password: 'Miracle@123',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
};



var imap = new Imap(imapConfig);
Promise.promisifyAll(imap);
module.exports.readmailbodyTravel=(callback)=>{

imap.once("ready", execute);
imap.once("error", function (err) {
    console.log("Connection error: " + err.stack);
});



imap.connect();


function execute() {

    

    imap.openBox("INBOX", false, function (err, mailBox) {
        if (err) {
            console.error(err);
            return;
        }
        imap.search(["SEEN"], function (err, results) {
            if (!results || !results.length) { console.log("No unread mails"); imap.end(); return; }
            /* mark as seen
            imap.setFlags(results, ['\\Seen'], function(err) {
                if (!err) {
                    console.log("marked as read");
                } else {
                    console.log(JSON.stringify(err, null, 2));
                }
            });*/

            var f = imap.fetch(results, { bodies: "" });
            //console.log(results);
            f.on("message", processMessage);
            f.once("error", function (err) {
                return Promise.reject(err);
            });
            f.once("end", function () {
                //console.log(message);
                //console.log("Done fetching all unseen messages.");
                imap.end();
            });
        });
    });
}




function processMessage(msg, seqno) {
    //console.log("Processing msg #" + seqno);
     //console.log(msg);

    var parser = new MailParser();
    parser.on("headers", function (headers) {
        console.log("Header: " + JSON.stringify(headers));
    });

    parser.on('data', data => {
        if (data.type === 'text') {
            //console.log(seqno);
            //console.log(data);
           callback(data);
          
         

        }
    });

    msg.on("body", function (stream) {

        //console.log("body.text");
        //console.log(body.username);
        stream.on("data", function (chunk) {
            //console.log(data);
            parser.write(chunk.toString("utf8"));

        });
    });
    msg.once("end", function () {
        // console.log("Finished msg #" + seqno);
        parser.end();
    });
}




     

//subject.Functionality(mail=>{

    //console.log(mail.subject);
    
//});
}

