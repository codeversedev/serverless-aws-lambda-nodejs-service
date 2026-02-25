 # Serverless AWS Lambda Node.js Service

A RESTful CRUD API built with the [Serverless Framework](https://www.serverless.com/), AWS Lambda, and Amazon DynamoDB using **single table design**.

## Architecture

```
API Gateway → Lambda Functions → DynamoDB (Single Table)
```

### DynamoDB Key Design

The table uses a composite primary key with prefixed values:

| Key | Format | Example |
| --- | ------ | ------- |
| `pk` (Partition Key) | `category#<category>` | `category#electronics` |
| `sk` (Sort Key) | `item#id#<uuid>` | `item#id#a1b2c3d4-5678-90ab-cdef-1234567890ab` |

### API Endpoints

| Method   | Endpoint                    | Description                        |
| -------- | --------------------------- | ---------------------------------- |
| `POST`   | `/items`                    | Create a new item                  |
| `GET`    | `/items/{category}`         | List all items in a category       |
| `GET`    | `/items/{category}/{id}`    | Get a specific item                |
| `PUT`    | `/items/{category}/{id}`    | Update an item                     |
| `DELETE` | `/items/{category}/{id}`    | Delete an item                     |
| `GET`    | `/items/search?name=&category=` | Search items by name           |

## Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [AWS CLI](https://aws.amazon.com/cli/) configured with credentials
- [Serverless Framework](https://www.serverless.com/) v3

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally with serverless-offline

```bash
npm run offline
```

The API will be available at `http://localhost:3000`.

### Deploy to AWS

```bash
# Deploy to dev stage (default)
npm run deploy

# Deploy to production
npm run deploy:prod
```

## Usage Examples

### Create an item

```bash
curl -X POST http://localhost:3000/dev/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Wireless Mouse", "category": "electronics", "description": "Bluetooth mouse"}'
```

### List items by category

```bash
curl http://localhost:3000/dev/items/electronics
```

### Get a single item

```bash
curl http://localhost:3000/dev/items/electronics/{id}
```

### Update an item

```bash
curl -X PUT http://localhost:3000/dev/items/electronics/{id} \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name", "description": "Updated description"}'
```

### Delete an item

```bash
curl -X DELETE http://localhost:3000/dev/items/electronics/{id}
```

### Search items by name

```bash
# Search across all categories
curl "http://localhost:3000/dev/items/search?name=Mouse"

# Search within a specific category (more efficient)
curl "http://localhost:3000/dev/items/search?name=Mouse&category=electronics"
```

## Project Structure

```
├── serverless.yml          # Serverless Framework configuration
├── package.json
├── src/
│   ├── handlers/
│   │   ├── createItem.js   # POST   /items
│   │   ├── getItem.js      # GET    /items/{category}/{id}
│   │   ├── listItems.js    # GET    /items/{category}
│   │   ├── searchItems.js  # GET    /items/search
│   │   ├── updateItem.js   # PUT    /items/{category}/{id}
│   │   └── deleteItem.js   # DELETE /items/{category}/{id}
│   └── lib/
│       ├── dynamodb.js     # DynamoDB client & single table key helpers
│       └── response.js     # HTTP response helper
└── tests/
    └── lib/
        └── response.test.js
```

## Running Tests

```bash
npm test
```

## License

MIT
