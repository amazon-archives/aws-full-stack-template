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
  var data = {
    attachments: [{
      title: "AWS Alarm",
      title_link: CLOUDWATCH_URL + message.AlarmName,
      fields: [
        {
          title: 'Alarm',
          value: message.AlarmName,
          short: true,
        }, {
          title: 'Time',
          value: new Date(message.StateChangeTime).toGMTString(),
          short: true,
        }, {
          title: 'Namespace',
          value: message.Trigger.Namespace,
          short: true,
        }, {
          title: 'MetricName',
          value: message.Trigger.MetricName,
          short: true,
        }, {
          title: 'Account',
          value: message.AWSAccountId,
          short: true,
        }, {
          title: 'Region',
          value: message.Region,
          short: true,
        }],
    }],
  };

  postMessage(data, function (response) {
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
