const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamoDb, TABLE_NAME, buildItemKey } = require("../lib/dynamodb");
const { response } = require("../lib/response");

/**
 * DELETE /items/{category}/{id}
 * Deletes an item from DynamoDB by category and id.
 */
module.exports.handler = async (event) => {
  try {
    const { category, id } = event.pathParameters;

    await dynamoDb.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: buildItemKey(category, id),
        ConditionExpression: "attribute_exists(pk)",
      })
    );

    return response(200, { message: "Item deleted successfully" });
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      return response(404, { error: "Item not found" });
    }
    console.error("Delete item error:", error);
    return response(500, { error: "Could not delete item" });
  }
};
