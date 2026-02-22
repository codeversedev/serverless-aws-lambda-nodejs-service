const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamoDb, TABLE_NAME } = require("../lib/dynamodb");
const { response } = require("../lib/response");

/**
 * GET /items/{id}
 * Retrieves a single item by id from DynamoDB.
 */
module.exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    const result = await dynamoDb.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id },
      })
    );

    if (!result.Item) {
      return response(404, { error: "Item not found" });
    }

    return response(200, result.Item);
  } catch (error) {
    console.error("Get item error:", error);
    return response(500, { error: "Could not retrieve item" });
  }
};
