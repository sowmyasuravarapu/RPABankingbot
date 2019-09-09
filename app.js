var express = require('express')();
// var server=require('http').createServer(express);
// var io=require('socket.io').listen(server);
var watson =require('watson-developer-cloud');
//var AssistantV1 = require('watson-developer-cloud/assistant/v1');

var assistant = new watson.AssistantV1({
    iam_apikey: 'VxOGwHliRrU0hn4OPoS_XvYAcdlL1P60nNVjMUjE8HOz',
    version: '2018-09-20',
    url: 'https://gateway.watsonplatform.net/assistant/api'
});


var firstPay =
	{
		workspace_id: 'c5786638-92b6-4b74-a08f-16f5cdac189d'
	}
assistant.message(firstPay, function (err, res) {
	//console.log("this is first request");
	if (err) {
		console.log('error:', err);
	}
	else {
		context = res.context;
		//console.log(res.output.text[0]);
		//console.log(context);
	}
});


var context;
module.exports.emailValidations = (data,callback) => {
	//console.log(data);
	var payload =
		{
			workspace_id: 'c5786638-92b6-4b74-a08f-16f5cdac189d',
			input: { "text": data },
			context: context
		}

	assistant.message(payload, function (err, res) {
		if (err) {
			console.log('error occured');
		}
		else {
			//console.log(data);
			console.log(res);
			context = res.context;
			//if(res.intents[0].intent=='leave'){
				//console.log('leave intent');
				//callback(res.intents[0].intent);
				callback(res);
			}

	});
			/*else if(res.intents[0].intent=='biometric_access'){
				
					//console.log('biometric intent');
					//callback(res.intents[0].intent);
					callback(res.output.text[0]);
			}
			else{
				console.log('not 2 of those');
			}*/
		
		
	}
	
		
	

