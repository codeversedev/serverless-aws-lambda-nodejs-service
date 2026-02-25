const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamoDb, TABLE_NAME, buildPk } = require("../lib/dynamodb");
const { response } = require("../lib/response");

/**
 * GET /items/{category}
 * Lists all items in a category from DynamoDB.
 */
module.exports.handler = async (event) => {
  try {
    const { category } = event.pathParameters;

    const result = await dynamoDb.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        KeyConditionExpression: "pk = :category",
        ExpressionAttributeValues: { ":category": buildPk(category) },
      })
    );

    return response(200, result.Items);
  } catch (error) {
    console.error("List items error:", error);
    return response(500, { error: "Could not list items" });
  }
};
