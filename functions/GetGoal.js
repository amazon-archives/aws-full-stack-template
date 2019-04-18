const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// GetGoal - Get goal information for a given user id
exports.handler = (event, context, callback) => {
  const params = {
    TableName: process.env.TABLE_NAME, //[ProjectName]-Goals,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': user identities are federated through the Cognito Identity 
    //             Pool, we will use the identity id as the user id of the 
    //             authenticated user
    // - 'goalId': a unique identifier for the goal (uuid)
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      goalId: event.pathParameters.id
    }
  };

  dynamoDb.get(params, (error, data) => {
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

    // Return status code 200 and the retrieved item on success
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(data.Item)
    };
    callback(null, response);
  });
}
