var https = require('https');
var url = require('url');

const CLOUDWATCH_URL = "https://console.aws.amazon.com/cloudwatch/home#alarmsV2:alarm/";

exports.handler = function (event, context) {
  var record = event.Records[0]['Sns'];

  var message = getJsonFromString(record.Message);

  if (message == null) {
    context.fail('CloudWatch Alarm messsage is not valid JSON');
    return;
  }

  var trigger = message.Trigger;
  var data = "@Present AWS Alarm\n\n :rotating_light: " + message.AlarmName;

  data += "\n :earth_americas:  " + message.Region + "  :clock1: " + new Date(message.StateChangeTime).toGMTString();

  if (trigger != null) {
    data += "\n :information_source:  " + trigger.Namespace;
    data += " | " + trigger.MetricName;
  }

  data += "\n :hash:  " + message.AWSAccountId;
  data += "\n\n :link:  " + CLOUDWATCH_URL + message.AlarmName;

  postMessage({ Content: data }, function (response) {
    if (response.statusCode == 200) {
      context.succeed();
    } else {
      context.fail("Error " + response.statusCode + " - " + response.statusMessage);
    }
  });
};

var getJsonFromString = function (str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};

var postMessage = function (message, callback) {
  var body = JSON.stringify(message);
  var options = url.parse(process.env.WEBHOOK_URL);
  options.method = 'POST';
  options.headers = {
    'Content-Type': 'application/json'
  };

  var postReq = https.request(options);

  postReq.write(body);
  postReq.end();
};
