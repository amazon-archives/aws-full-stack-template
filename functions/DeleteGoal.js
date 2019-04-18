const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  const params = {
    TableName: process.env.TABLE_NAME, //[ProjectName]-Goals,
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': user identities are federated through the Cognito Identity 
    //             Pool, we will use the identity id as the user id of the 
    //             authenticated user
    // - 'goalId': a unique identifier for the goal (uuid)
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      goalId: event.pathParameters.id
    }
  };

  dynamoDb.delete(params, (error, data) => {
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

    // Return status code 200 on success
    const response = {
      statusCode: 200,
      headers: headers,
    };
    callback(null, response);
  });
}
