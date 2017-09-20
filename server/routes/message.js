const config = require('config')['twilio'];
var twilio = require('twilio');

var accountSid = config.twilio_sid;
var authToken = config.twilio_token;

var twilioClient = new twilio(accountSid, authToken);

module.exports.sendMessage = (phone, movie, cinema, showtime, callback) {
  twilioClient.messages.create({
    to: phone,
    from: config.twilio_phone,
    body: 'Lucky you! ' + movie + 'is playing near you at ' +
    cinema + ' starting at ' + showtime + '. Checkout Movie Master App for more movie info.'
  })
  .then((message) => {
    console.log('************ twilio output ', message.sid);
    //save this message to history in postgres
    callback(null, 'message sent successfully');
  })
  .catch((err) => {
    console.log('******** twilio error ', err);
    callback(err);
  });
}
