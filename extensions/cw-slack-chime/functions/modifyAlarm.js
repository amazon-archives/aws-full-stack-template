const AWS = require('aws-sdk');
const cw = new AWS.CloudWatch();
const sns = new AWS.SNS();
const https = require('https');
const url = require('url');

const SUCCESS = "SUCCESS";
const FAILED = "FAILED";

exports.handler = function (event, context, callback) {
  console.log('Received event:', JSON.stringify(event, null, 2));

  if (event.RequestType === 'Create') {
    describeAlarm().then(function (data) {
      modifyAlertAndSubscribe(event, callback, context, data);
    }).catch(function (err) {
      var responseData = { Error: "Failed to modify alarm and subscribe SNS topic " + err.message };
      sendResponse(event, callback, context.logStreamName, FAILED, responseData);
    }
    );
  } else { // Delete
    describeAlarm().then(function (data) {
      removeSubscription(event, callback, context, data);
    }).catch(function (err) {
      var responseData = { Error: "Failed to modify alarm and unsubscribe SNS topic " + err.message };
      sendResponse(event, callback, context.logStreamName, FAILED, responseData);
    }
    ); return;
  }
};

function describeAlarm() {
  const params = {
    AlarmNames: [process.env.ALARM_NAME],
  };

  return cw.describeAlarms(params).promise();
}

function modifyAlertAndSubscribe(event, callback, context, data) {
  if (data.MetricAlarms && data.MetricAlarms.length > 0) {
    const origAlarm = data.MetricAlarms[0];

    const params = {
      "Namespace": origAlarm.Namespace,
      "MetricName": origAlarm.MetricName,
      "Dimensions": origAlarm.Dimensions,
      "AlarmActions": [...origAlarm.AlarmActions, process.env.SNS_TOPIC],
      "ComparisonOperator": origAlarm.ComparisonOperator,
      "DatapointsToAlarm": origAlarm.DatapointsToAlarm,
      "EvaluationPeriods": origAlarm.EvaluationPeriods,
      "Period": origAlarm.Period,
      "Statistic": origAlarm.Statistic,
      "Threshold": origAlarm.Threshold,
      "AlarmDescription": origAlarm.AlarmDescription,
      "AlarmName": origAlarm.AlarmName
    };


    return cw.putMetricAlarm(params).promise().then(function (data) {
      console.log(data);
      confirmAlert(event, callback, context);
    }).catch(function (err) {
      var responseData = { Error: "Failed to modify alarm and subscribe SNS topic" + err };
      sendResponse(event, callback, context.logStreamName, FAILED, responseData);
    });
  }
}

function removeSubscription(event, callback, context, data) {
  if (data.MetricAlarms && data.MetricAlarms.length > 0) {
    const origAlarm = data.MetricAlarms[0];

    const params = {
      "Namespace": origAlarm.Namespace,
      "MetricName": origAlarm.MetricName,
      "Dimensions": origAlarm.Dimensions,
      "AlarmActions": origAlarm.AlarmActions.filter(item => item !== process.env.SNS_TOPIC),
      "ComparisonOperator": origAlarm.ComparisonOperator,
      "DatapointsToAlarm": origAlarm.DatapointsToAlarm,
      "EvaluationPeriods": origAlarm.EvaluationPeriods,
      "Period": origAlarm.Period,
      "Statistic": origAlarm.Statistic,
      "Threshold": origAlarm.Threshold,
      "AlarmDescription": origAlarm.AlarmDescription,
      "AlarmName": origAlarm.AlarmName
    };


    return cw.putMetricAlarm(params).promise().then(function (data) {
      sendResponse(event, callback, context.logStreamName, SUCCESS);
    }).catch(function (err) {
      var responseData = { Error: "Failed to modify alarm and unsubscribe SNS topic" + err };
      sendResponse(event, callback, context.logStreamName, FAILED, responseData);
    });
  }
}

function confirmAlert(event, callback, context) {
  const message = { "AlarmName": process.env.ALARM_NAME, "AlarmDescription": null, "AWSAccountId": "XXX", "NewStateValue": "ALARM", "NewStateReason": "", "StateChangeTime": new Date().toISOString(), "Region": process.env.AWS_REGION, "OldStateValue": "", "Trigger": { "MetricName": "Ready!", "Namespace": "AWS", "StatisticType": "", "Statistic": "", "Unit": null, "Dimensions": [{ "name": "Currency", "value": "USD" }], "Period": 86400, "EvaluationPeriods": 1, "ComparisonOperator": "GreaterThanThreshold", "Threshold": 1.0, "TreatMissingData": "", "EvaluateLowSampleCountPercentile": "", "Timestamp": "2017-10-30T13: 20: 35.855Z", "SignatureVersion": "1", "Signature": "", "SigningCertUrl": "", "UnsubscribeUrl": "", "MessageAttributes": null } };

  var params = {
    Message: JSON.stringify(message),
    TopicArn: process.env.SNS_TOPIC
  };

  sns.publish(params).promise().then(function (data) {
    sendResponse(event, callback, context.logStreamName, SUCCESS);
  }).catch(function (err) {
    var responseData = { Error: "Failed to send test message" + err };
    sendResponse(event, callback, context.logStreamName, FAILED, responseData);
  });
}

function sendResponse(event, callback, logStreamName, responseStatus, responseData) {
  const responseBody = JSON.stringify({
    Status: responseStatus,
    Reason: `See the details in CloudWatch Log Stream: ${logStreamName}`,
    PhysicalResourceId: logStreamName,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: responseData,
  });

  console.log('RESPONSE BODY:\n', responseBody);

  const parsedUrl = url.parse(event.ResponseURL);
  const options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.path,
    method: 'PUT',
    headers: {
      'Content-Type': '',
      'Content-Length': responseBody.length,
    },
  };

  const req = https.request(options, (res) => {
    console.log('STATUS:', res.statusCode);
    console.log('HEADERS:', JSON.stringify(res.headers));
    callback(null, 'Successfully modified alarm.');
  });

  req.on('error', (err) => {
    console.log('sendResponse Error:\n', err);
    callback(err);
  });

  req.write(responseBody);
  req.end();
}

