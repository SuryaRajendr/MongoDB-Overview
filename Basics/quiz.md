

### 1. **What is MongoDB?**
**Answer:**  
MongoDB is a NoSQL database that stores data in a flexible, JSON-like format (BSON). Unlike relational databases, MongoDB is schema-less, meaning each record (document) can have a different structure. It is designed for scalability, high availability, and flexible data models, making it ideal for applications with evolving or unstructured data.

---

### 2. **What is a document in MongoDB?**
**Answer:**  
A document in MongoDB is a basic unit of data and is represented as a BSON (Binary JSON) object. It contains key-value pairs, where the values can be strings, numbers, arrays, or even other documents. Documents are stored in collections, similar to how rows are stored in tables in relational databases.

Example of a document:
```json
{
  "_id": ObjectId("60c72b2f5f9b1c0015b0c1d1"),
  "name": "John Doe",
  "age": 29,
  "email": "john@example.com"
}
```

---

### 3. **What is the difference between MongoDB and a relational database?**
**Answer:**  
- **Data Storage:** MongoDB uses collections to store documents, while relational databases use tables to store rows.
- **Schema:** MongoDB is schema-less, meaning each document can have a different structure. Relational databases require a predefined schema with a fixed structure for all rows in a table.
- **Scalability:** MongoDB is designed for horizontal scaling using sharding. Relational databases generally scale vertically by adding more resources to a single server.
- **Data Relationships:** In relational databases, relationships between tables are established through foreign keys and joins. MongoDB stores related data in a nested manner within documents or by using references.

---

### 4. **What is an _id in MongoDB?**
**Answer:**  
The `_id` field in MongoDB is a unique identifier for each document in a collection. By default, MongoDB generates an ObjectId as the value for the `_id` field, but you can specify your own value. The `_id` field must be unique within the collection and is automatically indexed.

---

### 5. **What is the difference between `find()` and `findOne()` in MongoDB?**
**Answer:**  
- **`find()`**: Returns a cursor to all documents that match the query criteria. It is typically used when you expect multiple results.
- **`findOne()`**: Returns a single document that matches the query criteria. It is used when you only need a single result, or the query is expected to return only one document.

Example:
```javascript
db.collection.find({ age: 29 }); // Returns a cursor to multiple matching documents
db.collection.findOne({ age: 29 }); // Returns a single document matching the query
```

---

### 6. **What is an index in MongoDB?**
**Answer:**  
An index in MongoDB is a data structure that improves the speed of data retrieval operations. Indexes are used to quickly find documents that match a query condition without having to scan the entire collection. By default, MongoDB creates an index on the `_id` field, but you can create additional indexes on other fields to optimize queries.

Example:
```javascript
db.collection.createIndex({ age: 1 }); // Creates an ascending index on the 'age' field
```

---

### 7. **What is sharding in MongoDB?**
**Answer:**  
Sharding is the process of distributing data across multiple servers to ensure horizontal scalability and to handle large volumes of data. MongoDB divides the data into smaller chunks and distributes them across different servers, or shards. Each shard contains a subset of the data, and a **mongos** router directs queries to the appropriate shard.

---

### 8. **What are the different types of relationships in MongoDB?**
**Answer:**  
There are two main ways to represent relationships in MongoDB:
- **Embedding (One-to-many or One-to-one):** Data is stored as a nested array or document inside another document.
- **Referencing (Many-to-many):** Data is stored in separate documents, and references (typically ObjectIds) are used to link related documents.

Example of embedding:
```json
{
  "_id": ObjectId("60c72b2f5f9b1c0015b0c1d1"),
  "name": "John Doe",
  "addresses": [
    { "street": "123 Main St", "city": "New York" },
    { "street": "456 Elm St", "city": "Boston" }
  ]
}
```

Example of referencing:
```json
{
  "_id": ObjectId("60c72b2f5f9b1c0015b0c1d1"),
  "name": "John Doe",
  "addressId": ObjectId("60c72b2f5f9b1c0015b0c1d2")
}
```

---

### 9. **How do you perform an aggregation in MongoDB?**
**Answer:**  
MongoDB provides the `aggregate()` method to process data in stages and return aggregated results. The aggregation pipeline allows you to apply multiple operations like filtering, grouping, sorting, and transforming data.

Example of aggregation:
```javascript
db.collection.aggregate([
  { $match: { age: { $gte: 30 } } },
  { $group: { _id: "$age", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]);
```

---

### 10. **What are the CRUD operations in MongoDB?**
**Answer:**  
CRUD stands for **Create**, **Read**, **Update**, and **Delete**, the four basic operations for manipulating data in MongoDB:

- **Create:** `insertOne()` and `insertMany()` to add documents.
- **Read:** `find()`, `findOne()` to retrieve documents.
- **Update:** `updateOne()`, `updateMany()`, and `replaceOne()` to modify documents.
- **Delete:** `deleteOne()` and `deleteMany()` to remove documents.

Example:
```javascript
// Create
db.collection.insertOne({ name: "John", age: 29 });

// Read
db.collection.find({ age: { $gte: 25 } });

// Update
db.collection.updateOne({ name: "John" }, { $set: { age: 30 } });

// Delete
db.collection.deleteOne({ name: "John" });
```

---

### 11. **What is a replica set in MongoDB?**
**Answer:**  
A **replica set** is a group of MongoDB instances that maintain the same data set, providing data redundancy and high availability. A replica set consists of a primary node and one or more secondary nodes. The primary node handles all write operations, while the secondary nodes replicate the data from the primary node. If the primary node fails, one of the secondary nodes is automatically elected as the new primary.

---

### 12. **What is the difference between `update()` and `updateOne()` in MongoDB?**
**Answer:**  
- **`update()`**: The method updates one or more documents that match the query criteria. If no options are provided, it can update multiple documents.
- **`updateOne()`**: The method updates a single document that matches the query criteria. It is more efficient than `update()` when updating only one document.

Example:
```javascript
// update
db.collection.update({ age: 29 }, { $set: { age: 30 } }); // Updates all matching documents

// updateOne
db.collection.updateOne({ age: 29 }, { $set: { age: 30 } }); // Updates only one matching document
```

---
### 13. **What is the purpose of the `$exists` operator in MongoDB?**
**Answer:**  
The `$exists` operator is used to query for documents where a specific field is either present or missing. It can be used in the **find()** method to check for the existence of a field.

Example:
```javascript
// Find documents where the 'email' field exists
db.collection.find({ email: { $exists: true } });

// Find documents where the 'email' field does not exist
db.collection.find({ email: { $exists: false } });
```

---

### 14. **What is the `$in` operator in MongoDB?**
**Answer:**  
The `$in` operator is used to match the value of a field against an array of possible values. It allows you to find documents where the field value matches any value in a provided array.

Example:
```javascript
// Find documents where 'age' is 25, 30, or 35
db.collection.find({ age: { $in: [25, 30, 35] } });
```

---

### 15. **What are the different types of data types in MongoDB?**
**Answer:**  
MongoDB supports a variety of data types, including:
- **String**: Used for text data.
- **Integer**: 32-bit or 64-bit integer values.
- **Boolean**: True or false values.
- **Double**: Floating-point numbers.
- **Date**: Date and time.
- **Array**: Lists of values, which can be of any type.
- **Object**: Embedding another document.
- **Null**: A null value.
- **ObjectId**: A unique identifier for documents.
- **Binary Data**: For storing binary data like files.
- **Regular Expression**: For storing regular expression patterns.
- **Code**: For storing JavaScript code.

---

### 16. **How can you optimize queries in MongoDB?**
**Answer:**  
You can optimize queries in MongoDB by:
- **Using indexes**: Create indexes on frequently queried fields to speed up searches.
- **Using `projection`**: Specify which fields to return to reduce the amount of data transferred.
- **Avoiding `$regex` on large fields**: `$regex` queries on large fields can be slow; use text indexes or store keywords for faster matching.
- **Using `$limit` and `$skip`**: Limit the number of documents returned to reduce memory usage.
- **Using the aggregation pipeline**: For complex queries, the aggregation framework can be more efficient than using multiple `find()` operations.

---

### 17. **Explain the concept of a "replica set" in MongoDB.**
**Answer:**  
A **replica set** in MongoDB is a group of MongoDB servers that maintain the same data set. Replica sets provide redundancy and high availability. In a replica set, one node is designated as the **primary** node, which handles all write operations. The **secondary** nodes replicate the data from the primary node. If the primary node goes down, one of the secondaries is automatically elected as the new primary.

---

### 18. **What are capped collections in MongoDB?**
**Answer:**  
A **capped collection** in MongoDB is a fixed-size collection that automatically overwrites the oldest documents when it reaches its maximum size. It maintains the insertion order of documents and is useful for logging or storing recent data. Capped collections are efficient because they support high-performance, fixed-size data storage.

---

### 19. **How do you perform a `join` operation in MongoDB?**
**Answer:**  
MongoDB does not support traditional **JOIN** operations like relational databases. However, you can achieve similar results through:
- **Embedding documents**: Store related data within the same document to avoid joins.
- **Using references**: Use the `$lookup` stage in the aggregation pipeline to join documents from two collections based on a common field (like performing a LEFT JOIN in SQL).

Example of using `$lookup`:
```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerDetails"
    }
  }
]);
```

---

### 20. **What are the different ways to query documents in MongoDB?**
**Answer:**
- **`find()`**: Finds all documents matching the query condition.
- **`findOne()`**: Finds a single document that matches the query condition.
- **`count()`**: Counts the number of documents that match the query condition.
- **`distinct()`**: Returns distinct values of a field across all documents.
- **`aggregate()`**: For more advanced querying and data transformation using the aggregation framework.

Example:
```javascript
// Find documents with age greater than 25
db.users.find({ age: { $gt: 25 } });

// Get distinct email addresses
db.users.distinct("email");

// Count the number of users with age greater than 25
db.users.count({ age: { $gt: 25 } });
```

---

### 21. **Explain the difference between `update()` and `updateOne()` in MongoDB.**
**Answer:**  
- **`update()`**: It is an older method that was used to update multiple documents. It is now deprecated in favor of `updateOne()` and `updateMany()`.
- **`updateOne()`**: Updates a single document that matches the specified query criteria. If no document matches the query, no update is performed.

Example:
```javascript
// `update` updates multiple documents
db.users.update({ age: 25 }, { $set: { status: "active" } }, { multi: true });

// `updateOne` updates a single document
db.users.updateOne({ age: 25 }, { $set: { status: "active" } });
```

---

### 22. **What are the different aggregation stages in MongoDB?**
**Answer:**  
MongoDB aggregation pipeline consists of several stages that are used to process data:
- **`$match`**: Filters documents based on a condition.
- **`$group`**: Groups documents by a specific field and applies aggregations like `sum`, `avg`, `min`, etc.
- **`$sort`**: Sorts the documents.
- **`$project`**: Reshapes each document, selecting or excluding fields.
- **`$limit`**: Limits the number of documents returned.
- **`$skip`**: Skips a specified number of documents.
- **`$unwind`**: Deconstructs an array field from the input documents.

Example:
```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", totalAmount: { $sum: "$amount" } } },
  { $sort: { totalAmount: -1 } }
]);
```

---

### 23. **What is the difference between `null` and `undefined` in MongoDB queries?**
**Answer:**  
- **`null`**: Represents a field with an explicitly assigned null value. In queries, documents where a field is explicitly set to `null` are returned.
- **`undefined`**: Represents a field that does not exist in a document. In queries, documents where a field is missing are returned.

Example:
```javascript
// Query for documents where 'age' is null
db.users.find({ age: null });

// Query for documents where 'age' is not defined (missing field)
db.users.find({ age: { $exists: false } });
```

---

### 24. **What are the different types of indexes in MongoDB?**
**Answer:**  
MongoDB supports different types of indexes to optimize query performance:
- **Single-field Index**: An index on a single field.
- **Compound Index**: An index on multiple fields.
- **Multikey Index**: An index for array fields.
- **Text Index**: An index for text search on string fields.
- **Hashed Index**: An index that uses a hash of the field value.
- **Geospatial Index**: For location-based queries.

Example:
```javascript
// Single-field index
db.collection.createIndex({ age: 1 });

// Compound index
db.collection.createIndex({ age: 1, name: -1 });

// Text index
db.collection.createIndex({ description: "text" });
```

---
