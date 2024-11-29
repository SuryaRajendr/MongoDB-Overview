Here's a concise theoretical note on MongoDB, along with examples of queries, in markdown format (`.md`):

```markdown
# MongoDB Notes & Queries

## What is MongoDB?

MongoDB is a NoSQL database that stores data in a flexible, JSON-like format, known as BSON (Binary JSON). Unlike traditional relational databases, MongoDB is schema-less, allowing you to store data without predefined tables or relationships.

## Key Concepts

- **Document**: A record in MongoDB. It is similar to a row in relational databases.
- **Collection**: A grouping of MongoDB documents. It is similar to a table in relational databases.
- **Database**: A container for collections.

## MongoDB CRUD Operations

### 1. **Create**

- **Insert a Single Document**

```javascript
db.users.insertOne({
  name: "John Doe",
  age: 30,
  email: "john@example.com"
});
```

- **Insert Multiple Documents**

```javascript
db.users.insertMany([
  { name: "Jane Smith", age: 25, email: "jane@example.com" },
  { name: "Alex Johnson", age: 28, email: "alex@example.com" }
]);
```

### 2. **Read**

- **Find One Document**

```javascript
db.users.findOne({ name: "John Doe" });
```

- **Find Multiple Documents**

```javascript
db.users.find({ age: { $gte: 25 } });
```

- **Find with Projection**

```javascript
db.users.find({ age: { $gte: 25 } }, { name: 1, email: 1 });
```

### 3. **Update**

- **Update One Document**

```javascript
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 31 } }
);
```

- **Update Multiple Documents**

```javascript
db.users.updateMany(
  { age: { $lt: 30 } },
  { $set: { status: "young" } }
);
```

### 4. **Delete**

- **Delete One Document**

```javascript
db.users.deleteOne({ name: "John Doe" });
```

- **Delete Multiple Documents**

```javascript
db.users.deleteMany({ age: { $lt: 30 } });
```

## MongoDB Operators

### 1. **Comparison Operators**

- `$eq` (Equal to)

```javascript
db.users.find({ age: { $eq: 30 } });
```

- `$lt` (Less than)

```javascript
db.users.find({ age: { $lt: 30 } });
```

- `$gt` (Greater than)

```javascript
db.users.find({ age: { $gt: 20 } });
```

- `$in` (In Array)

```javascript
db.users.find({ age: { $in: [25, 30] } });
```

### 2. **Logical Operators**

- `$and` (Logical AND)

```javascript
db.users.find({
  $and: [
    { age: { $gt: 20 } },
    { name: { $eq: "John" } }
  ]
});
```

- `$or` (Logical OR)

```javascript
db.users.find({
  $or: [
    { age: { $gt: 30 } },
    { name: { $eq: "Alex" } }
  ]
});
```

### 3. **Array Operators**

- `$push` (Add an element to an array)

```javascript
db.users.updateOne(
  { name: "Jane Smith" },
  { $push: { hobbies: "Reading" } }
);
```

- `$pull` (Remove an element from an array)

```javascript
db.users.updateOne(
  { name: "Jane Smith" },
  { $pull: { hobbies: "Reading" } }
);
```

### 4. **Text Search**

To perform a text search, you need to create a text index:

```javascript
db.users.createIndex({ name: "text", email: "text" });
```

Search for documents containing specific keywords:

```javascript
db.users.find({ $text: { $search: "John" } });
```

### 5. **Aggregation Framework**

MongoDB’s aggregation framework allows you to process data in stages, similar to SQL `GROUP BY` and `JOIN`.

#### Example: Group by Age and Count

```javascript
db.users.aggregate([
  { $group: { _id: "$age", count: { $sum: 1 } } }
]);
```

#### Example: Sorting Documents

```javascript
db.users.aggregate([
  { $sort: { age: -1 } }
]);
```

#### Example: Limiting Results

```javascript
db.users.aggregate([
  { $limit: 5 }
]);
```

## Indexing in MongoDB

Indexes improve query performance by reducing the number of documents MongoDB needs to scan.

- **Create an Index**

```javascript
db.users.createIndex({ name: 1 });
```

- **List All Indexes**

```javascript
db.users.getIndexes();
```

- **Drop an Index**

```javascript
db.users.dropIndex("name_1");
```

## MongoDB Sharding

Sharding is a method for distributing data across multiple machines to ensure horizontal scalability.

- **Enable Sharding on a Database**

```javascript
sh.enableSharding("mydatabase");
```

- **Sharding on a Collection**

```javascript
sh.shardCollection("mydatabase.users", { age: 1 });
```

---

## MongoDB Aggregation Pipeline Stages

1. **$match**: Filters documents based on a condition.

```javascript
db.users.aggregate([
  { $match: { age: { $gte: 30 } } }
]);
```

2. **$project**: Reshapes each document.

```javascript
db.users.aggregate([
  { $project: { name: 1, age: 1 } }
]);
```

3. **$group**: Groups documents by a specific field.

```javascript
db.users.aggregate([
  { $group: { _id: "$age", total: { $sum: 1 } } }
]);
```

4. **$sort**: Sorts the documents.

```javascript
db.users.aggregate([
  { $sort: { age: -1 } }
]);
```

5. **$limit**: Limits the number of documents returned.

```javascript
db.users.aggregate([
  { $limit: 10 }
]);
```

---

## Conclusion

MongoDB is a powerful NoSQL database with flexible data structures and fast query capabilities. By understanding its core features like CRUD operations, aggregation, indexing, and sharding, you can build scalable, efficient applications.

This cheat sheet provides basic MongoDB operations and concepts to help you work with MongoDB databases.
```

This markdown document will serve as a reference for MongoDB queries, concepts like CRUD operations, aggregation, text search, indexing, and sharding. You can use it to quickly look up common MongoDB queries and their usage in your projects.