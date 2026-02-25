 # Serverless AWS Lambda Node.js Service

A RESTful CRUD API built with the [Serverless Framework](https://www.serverless.com/), AWS Lambda, and Amazon DynamoDB.

## Architecture

```
API Gateway → Lambda Functions → DynamoDB
```

| Method   | Endpoint       | Description        |
| -------- | -------------- | ------------------ |
| `POST`   | `/items`       | Create a new item  |
| `GET`    | `/items`       | List all items     |
| `GET`    | `/items/{id}`  | Get item by ID     |
| `PUT`    | `/items/{id}`  | Update an item     |
| `DELETE` | `/items/{id}`  | Delete an item     |

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

### Remove the stack

```bash
npm run remove
```

## Usage Examples

### Create an item

```bash
curl -X POST http://localhost:3000/dev/items \
  -H "Content-Type: application/json" \
  -d '{"name": "My Item", "description": "A sample item"}'
```

### List all items

```bash
curl http://localhost:3000/dev/items
```

### Get a single item

```bash
curl http://localhost:3000/dev/items/{id}
```

### Update an item

```bash
curl -X PUT http://localhost:3000/dev/items/{id} \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name", "description": "Updated description"}'
```

### Delete an item

```bash
curl -X DELETE http://localhost:3000/dev/items/{id}
```

## Project Structure

```
├── serverless.yml          # Serverless Framework configuration
├── package.json
├── src/
│   ├── handlers/
│   │   ├── createItem.js   # POST   /items
│   │   ├── getItem.js      # GET    /items/{id}
│   │   ├── listItems.js    # GET    /items
│   │   ├── updateItem.js   # PUT    /items/{id}
│   │   └── deleteItem.js   # DELETE /items/{id}
│   └── lib/
│       ├── dynamodb.js     # DynamoDB client singleton
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
