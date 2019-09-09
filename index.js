// const AWS=require('aws-sdk');

// const doClient=new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
var fs = require('fs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var mailIntent = require('./mail');
var downloadpdf = require('./sample1.js');
var watson = require('./app');
var body = require('./mail2');
var Address = require('./mail3');
var Travel = require('./mail4');
var Reward= require('./mail5');
var mailAccountUser = 'ssuravarapu@miraclesoft.com'
var mailAccountPassword = 'Miracle@321'
var fromEmailAddress = 'ssuravarapu@miraclesoft.com'
//var toEmailAddress = 'harshitha3310sample@gmail.com'
//var toEmail='rickeysmith999@gmail.com'
var toEmailAdd = 'ramasuravarapu46@gmail.com'
var toEmailaddress1 = 'ramasuravarapu46@gmail.com'
var transport = nodemailer.createTransport({
    host: 'smtp.miraclesoft.com',
    port: 587,
    tls: true,
    auth: {
        user: mailAccountUser,
        pass: mailAccountPassword
    }
})
mailForAccountDeactivation = {
    from: fromEmailAddress,
    to: toEmailAdd,
    subject: "Account Deactivation",
    text: "I would like to deactivate my account and my account number is 2050"



    //attachments: [{
    //filename: 'Account Deactivation.pdf',
    //path: 'C:/Users/ssuravarapu/Desktop/download/account_deactivation/Account Deactivation.pdf',
    //contentType: 'application/pdf'
    // }]
}


mailForCustomerOnBoarding =
    {
        from: fromEmailAddress,
        to: toEmailAdd,
        subject: "I would like to open a Checking account",
        //text:"I would like to open an account in your bank and here are my details",




        attachments: [{
            filename: 'Customer onboarding.pdf',
            path: 'C:/Users/ssuravarapu/Desktop/RPAWatson/customer_onboarding/new Checking/Customer Onboarding.pdf',
            contentType: 'application/pdf'
        }]
    }

//}]
//}

mailForAddressChange =
    {
        from: fromEmailAddress,
        to: toEmailAdd,
        subject: "Address change",
        text: "I would like to change my address from 6720 Courtney Park Road, APT 7106, Charlotte , 248-233-1872, NC - 28217, USA, and to address is 22452 Chester CT, APT 1201, Farmington, 248-233-1805, MI - 48335, USA,",


    }




mailForTravelUpdate =
    {
        from: fromEmailAddress,
        to: toEmailaddress1,
        subject: "Travel Update",
        text: "I will be travelling to Canada from 09/01/2018 to till Tuesday 09/05/2018"

    }


    mailForRewardPoint={

        from:fromEmailAddress,
        to:toEmailAdd,
        subject:"RewardPoint",
        text:"I have my 1000 reward points with me can you please convert them into new creditcard and my account name is MSS and credit card number is 62206492259"
    }


transport.sendMail(mailForRewardPoint, function (error, response) {
    if (error) {
        console.log(error)
    } else {
        console.log(pwd);
    }

    transport.close();

});



Reward.Rewardbody(dataReward => {
    //console.log("Reward point function");
     //console.log(dataReward);
    //console.log(JSON.stringify(dataReward));
    
    var initialReward= JSON.stringify(dataReward).toString().split("\\n\\n")[0].split('"text":"')[1].split(',\\n')[0];
    //console.log(initialReward);
    //console.log('-------------------------rewardpointloop----------------');
    watson.emailValidations(initialReward, (data) => {
                       console.log("hello")
                       console.log(data.entities)
                       
        if (data.intents[0].intent == "Reward_Redemption") {
            
           data.entities.filter(inData=>{
                    console.log("inside filter")
             if(inData.value=="new Saving"){
                 console.log(inData.value)
             var newReward = data.output.text + " Customer Email Id: " + fromEmailAddress;
             console.log(newReward)
             var PDFDocument = require('pdfkit');
             doc = new PDFDocument
             doc.pipe(fs.createWriteStream('./reward_point/savings/Reward_Point.pdf'));
             doc.font('Times-Roman')
                 .fontSize(25)
                 .text(newReward, 100, 100)
     
             doc.end();
             }
           })     
    }
   
        //console.log('inside email validaions');
        //console.log(data);
        
          if (data.intents[0].intent == "Reward_Redemption") {          
           //console.log("Reward point redemption loop");
            //console.log(data.output.text);
            data.entities.filter(indData =>{
                console.log('inside entities filter');
                if(indData.value == "new CreditCard"){
                    console.log(indData.value);
                    var newReward = data.output.text + " Customer Email Id: " + fromEmailAddress;
                    var PDFDocument = require('pdfkit');
                    doc = new PDFDocument
                    doc.pipe(fs.createWriteStream('./reward_point/credit/Reward_Point.pdf'));
                    doc.font('Times-Roman')
                        .fontSize(25)
                        .text(newReward, 100, 100)
            
                    doc.end();        
                }
            })
        }
         
   
       
    });
    
    });

 /*  
mailIntent.mailFunctionality(data1 => {
    watson.emailValidations(data1, (data) => {
        //console.log(data);
        if (data.intents[0].intent == "Customer_onboarding" && data.entities[0].value == "new Saving") {

            downloadpdf.pdfData(data.intents[0].intent,data.entities[0].value,message => {
                //console.log(message);
              
            });
        }

        else if(data.intents[0].intent=="Customer_onboarding" && data.entities[0].value=="new Checking"){
            downloadpdf.pdfData(data.intents[0].intent,data.entities[0].value,message => {
                //console.log(message);
                
            });

        }
        else if(data.intents[0].intent=="Customer_onboarding" && data.entities[0].value=="new CreditCard"){
            downloadpdf.pdfData(data.intents[0].intent, data.entities[0].value, message => {
                //console.log(message);
            });
        }



    })

})
 
*/
body.mailbody(dataInput => {
    //console.log("Inside function");
    // console.log(dataInput);
    //console.log("------------------------------------------------");
    // console.log(JSON.stringify(dataInput));
    var localInput = JSON.stringify(dataInput).toString().split("\\n\\n")[0].split('"text":"')[1].split(', \\n')[0];
    // console.log(localInput)
    watson.emailValidations(localInput, (data) => {
        // console.log("------------------------");
        // console.log(data);
        // console.log(data.intents[0].intent)
        if (data.intents[0].intent == "Account_Deactivation") {
            //console.log("account deactivation loop");
            //console.log(data.output.text);
            var finalData = data.output.text + " Customer Email Id:" + fromEmailAddress;
            var PDFDocument = require('pdfkit');
            doc = new PDFDocument
            doc.pipe(fs.createWriteStream('./account_deactivation/Account Deactivation.pdf'));

            doc.font('Times-Roman')
                .fontSize(25)
                .text(finalData, 100, 100)
            doc.end();
        }
    });
});


Address.readmailbodyAdd(dataAdd => {
    //console.log("profile update function");
    //console.log(dataAdd);
    //console.log(JSON.stringify(dataAdd));

    var initialData = JSON.stringify(dataAdd).toString().split("\\n\\n")[0].split('"text":"')[1].split(', \\n')[0];
    //console.log(initialData);

    watson.emailValidations(initialData, (data) => {

        if (data.intents[0].intent == "Original_Address") {
            //console.log("Address Change loop");
            //console.log(data.output.text);
            var newaddress = data.output.text + " Customer Email Id: " + fromEmailAddress;
            var PDFDocument = require('pdfkit');
            doc = new PDFDocument

            doc.pipe(fs.createWriteStream('./address_change/Address Change.pdf'));
            doc.font('Times-Roman')
                .fontSize(25)
                .text(newaddress, 100, 100)
            doc.end();
        }

    });
});




Travel.readmailbodyTravel(dataTravel => {
    //console.log("travel function");
    //console.log(dataTravel);
    //console.log(JSON.stringify(dataTravel));

    var initialTravel = JSON.stringify(dataTravel).toString().split("\\n\\n")[0].split('"text":"')[1].split(', \\n')[0];
    //console.log(initialTravel);

    watson.emailValidations(initialTravel, (data) => {

        if (data.intents[0].intent == "Travel_Update") {
            //console.log("Travel update loop");
            //console.log(data.output.text);
            var newTravel = data.output.text + " Customer Email Id: " + fromEmailAddress;
            var PDFDocument = require('pdfkit');
            doc = new PDFDocument
            doc.pipe(fs.createWriteStream('./travel_update/Travel_Update.pdf'));
            doc.font('Times-Roman')
                .fontSize(25)
                .text(newTravel, 100, 100)

            doc.end();
        }
    });
});



