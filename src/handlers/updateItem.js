const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { dynamoDb, TABLE_NAME } = require("../lib/dynamodb");
const { response } = require("../lib/response");

/**
 * PUT /items/{id}
 * Updates an existing item in DynamoDB.
 */
module.exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;
    const data = JSON.parse(event.body);

    if (!data.name && !data.description) {
      return response(400, {
        error: 'At least one of "name" or "description" is required',
      });
    }

    const expressionParts = [];
    const expressionValues = {};
    const expressionNames = {};

    if (data.name) {
      expressionParts.push("#name = :name");
      expressionValues[":name"] = data.name;
      expressionNames["#name"] = "name";
    }

    if (data.description !== undefined) {
      expressionParts.push("#description = :description");
      expressionValues[":description"] = data.description;
      expressionNames["#description"] = "description";
    }

    expressionParts.push("#updatedAt = :updatedAt");
    expressionValues[":updatedAt"] = new Date().toISOString();
    expressionNames["#updatedAt"] = "updatedAt";

    const result = await dynamoDb.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: `SET ${expressionParts.join(", ")}`,
        ExpressionAttributeValues: expressionValues,
        ExpressionAttributeNames: expressionNames,
        ReturnValues: "ALL_NEW",
        ConditionExpression: "attribute_exists(id)",
      })
    );

    return response(200, result.Attributes);
  } catch (error) {
    if (error.name === "ConditionalCheckFailedException") {
      return response(404, { error: "Item not found" });
    }
    console.error("Update item error:", error);
    return response(500, { error: "Could not update item" });
  }
};
