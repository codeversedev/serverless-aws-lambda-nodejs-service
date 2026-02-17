const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamoDb, TABLE_NAME } = require("../lib/dynamodb");
const { response } = require("../lib/response");

/**
 * GET /items/search?name={name}
 * Searches items by name (case-sensitive contains match).
 */
module.exports.handler = async (event) => {
  try {
    const { name } = event.queryStringParameters || {};

    if (!name) {
      return response(400, { error: '"name" query parameter is required' });
    }

    const result = await dynamoDb.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: "contains(#name, :name)",
        ExpressionAttributeNames: { "#name": "name" },
        ExpressionAttributeValues: { ":name": name },
      })
    );

    return response(200, result.Items);
  } catch (error) {
    console.error("Search items error:", error);
    return response(500, { error: "Could not search items" });
  }
};
