const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");
const { dynamoDb, TABLE_NAME } = require("../lib/dynamodb");
const { response } = require("../lib/response");

/**
 * POST /items
 * Creates a new item in DynamoDB.
 */
module.exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    if (!data.name) {
      return response(400, { error: '"name" is required' });
    }

    const timestamp = new Date().toISOString();
    const item = {
      id: uuidv4(),
      name: data.name,
      description: data.description || "",
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    await dynamoDb.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      })
    );

    return response(201, item);
  } catch (error) {
    console.error("Create item error:", error);
    return response(500, { error: "Could not create item" });
  }
};
