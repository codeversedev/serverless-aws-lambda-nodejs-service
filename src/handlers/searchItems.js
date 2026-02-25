const { QueryCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamoDb, TABLE_NAME, buildPk } = require("../lib/dynamodb");
const { response } = require("../lib/response");

/**
 * GET /items/search?name={name}&category={category}
 * Searches items by name (case-sensitive contains match).
 * If category is provided, queries within that category; otherwise scans all items.
 */
module.exports.handler = async (event) => {
  try {
    const { name, category } = event.queryStringParameters || {};

    if (!name) {
      return response(400, { error: '"name" query parameter is required' });
    }

    let result;

    if (category) {
      // Query within a specific category for better performance
      result = await dynamoDb.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          KeyConditionExpression: "pk = :category",
          FilterExpression: "contains(#name, :name)",
          ExpressionAttributeNames: { "#name": "name" },
          ExpressionAttributeValues: { ":name": name, ":category": buildPk(category) },
        })
      );
    } else {
      // Scan across all categories
      result = await dynamoDb.send(
        new ScanCommand({
          TableName: TABLE_NAME,
          FilterExpression: "contains(#name, :name)",
          ExpressionAttributeNames: { "#name": "name" },
          ExpressionAttributeValues: { ":name": name },
        })
      );
    }

    return response(200, result.Items);
  } catch (error) {
    console.error("Search items error:", error);
    return response(500, { error: "Could not search items" });
  }
};
