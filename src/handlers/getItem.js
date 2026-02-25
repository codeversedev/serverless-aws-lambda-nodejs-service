const { GetCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamoDb, TABLE_NAME, buildItemKey } = require("../lib/dynamodb");
const { response } = require("../lib/response");

/**
 * GET /items/{category}/{id}
 * Retrieves a single item by category and id from DynamoDB.
 */
module.exports.handler = async (event) => {
  try {
    const { category, id } = event.pathParameters;

    const result = await dynamoDb.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: buildItemKey(category, id),
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
