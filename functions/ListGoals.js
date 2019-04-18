const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  const params = {
    TableName: process.env.TABLE_NAME, //[ProjectName]-Goals
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId' partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id of the 
    //              authenticated user
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  dynamoDb.query(params, (error, data) => {
    // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials" : true
    };

    // Return status code 500 on error
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: error
      };
      callback(null, response);
      return;
    }

    // Return status code 200 and the retrieved items on success
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(data.Items)
    };
    callback(null, response);
  });
}
