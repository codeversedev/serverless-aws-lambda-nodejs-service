const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamoDb, TABLE_NAME } = require("../lib/dynamodb");
const { response } = require("../lib/response");

/**
 * GET /items
 * Lists all items from DynamoDB.
 */
module.exports.handler = async () => {
  try {
    const result = await dynamoDb.send(
      new ScanCommand({
        TableName: TABLE_NAME,
      })
    );

    return response(200, result.Items);
  } catch (error) {
    console.error("List items error:", error);
    return response(500, { error: "Could not list items" });
  }
};
