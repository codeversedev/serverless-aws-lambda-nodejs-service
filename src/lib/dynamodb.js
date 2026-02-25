const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.ITEMS_TABLE;

// Single table design key helpers
const PK_PREFIX = "category#";
const SK_PREFIX = "item#id#";

const buildPk = (category) => `${PK_PREFIX}${category}`;
const buildSk = (id) => `${SK_PREFIX}${id}`;
const buildItemKey = (category, id) => ({
  pk: buildPk(category),
  sk: buildSk(id),
});

module.exports = { dynamoDb, TABLE_NAME, PK_PREFIX, SK_PREFIX, buildPk, buildSk, buildItemKey };
