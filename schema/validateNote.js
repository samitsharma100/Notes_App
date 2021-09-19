
const addSchema = {
    "id": "AddSchema",
    "type": "array",
    "items": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "content": {
          "type": ["string", "null"]
        }
      },
      "required": [
        "title"
      ]
    }
  }

const editSchema = {
    "id": "EditSchema",
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
        "id": {
            "type": "number"
        },
        "title": {
            "type": "string"
        },
        "content": {
            "type": ["string", "null"]
        }
        },
        "required": [
            "id",
            "title"
        ]
    }
}

const deleteSchema = {
    "id": "DeleteSchema",
    "type": "array",
    "items": {"type": "number"}
}

module.exports = {
    addSchema,
    editSchema,
    deleteSchema
}