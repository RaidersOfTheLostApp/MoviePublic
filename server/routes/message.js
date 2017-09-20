const config = require('config')['twilio'];
var twilio = require('twilio');

var accountSid = config.twilio_sid;
var authToken = config.twilio_token;

var twilioClient = new twilio(accountSid, authToken);

var to_number = '+14153146506';

twilioClient.messages.create({
  to: to_number,
  from: config.twilio_phone,
  body: 'Hello from Movie Master App'
})
.then((message) => {
  console.log('************ twilio output ', message.sid);
  //save this message to history in postgres
})
.catch((err) => {
  console.log('******** twilio error ', err);
});
