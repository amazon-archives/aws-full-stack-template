const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME, //[ProjectName]-Goals
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'goalId': a unique identifier for the goal (uuid)
    // - 'title': user generated title for the goal (parsed from request body)
    // - 'content': user generated content for the goal (parsed from request body)
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      goalId: uuid.v1(),
      title: data.title,
      content: data.content,
      createdAt: Date.now()
    }
  };

  dynamoDb.put(params, (error, data) => {
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
      headers: headers
    };
    callback(null, response);
  });
}
