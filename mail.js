var MailListener = require("mail-listener2");

	
	
	// console.log("Inside mail");
	// exports.subject=mail.subject;

var mailListener = new MailListener({
	
	
	
  username: "ramasuravarapu46@gmail.com",
  password: "Miracle@123", // works for me: https://accounts.google.com/b/0/IssuedAuthSubTokens?hide_authsub=1
  host: "imap.gmail.com",
  port: 993, // imap port
  tls: true,
  fetchUnreadOnStart: true, //,
//});
   tlsOptions: { rejectUnauthorized: false },
   mailbox: "INBOX", // mailbox to monitor
   searchFilter: "SEEN", // the search filter being used after an IDLE notification has been retrieved
   markSeen: true, // all fetched email willbe marked as seen and not fetched next time
   fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: {streamAttachments: true} // options to be passed to mailParser lib.
 });

mailListener.on("server:connected", function(){
  console.log("imapConnected");
});

mailListener.on("server:disconnected", function(){
  //console.log("imapDisconnected");
});

// this is where it starts to differ from the first sample

// A more complex example.
// Get the first 20 (UNSEEN) emails, mark them read (\SEEN), 
// and archive them.
module.exports.mailFunctionality= (callback)=> {
  // make sure you include in options:  
  //   fetchUnreadOnStart: true,
  // var count = 0;

  mailListener.on("mail", function(mail, seqno, attributes) {
    var mailuid = attributes.uid;
      // toMailbox = '[Gmail]/All Mail';
    //   i = ++count;

    // if (i > 20) {
    //   mailListener.stop(); // start listening
    //   return;
    // }
    
	//console.log(mail.subject);
		callback(mail.subject);


    // console.log('attempting to mark msg read/seen');
    // mailListener.imap.addFlags(mailuid, '\\Seen', function (err) {
      // if (err) {
        // console.log('error marking message read/SEEN');
        // return;
      // }

      // console.log('moving ' + (seqno || '?') + ' to ' + toMailbox);
        // mailListener.imap.move(mailuid, toMailbox, function (err) {
          // if (err) {
            // console.log('error moving message');
            // return;
          // }
          // console.log('moved ' + (seqno || '?'), mail.subject);
        // });
    // });
  });
}

mailListener.start(); // start listening

// When testing this script with GMail in US it took about 
// 8 seconds to get unread email list, another 40 seconds 
// to archive those 20 messages (move to All Mail).
setTimeout(function () {
  mailListener.stop(); // start listening
}, 60*1000);


