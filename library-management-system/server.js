const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.config");

const bookRoutes = require("./routes/book.routes");
const memberRoutes = require("./routes/member.routes");
const borrowRecordRoutes = require("./routes/borrowRecord.routes");

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/books", bookRoutes);
app.use("/members", memberRoutes);
app.use("/borrowRecords", borrowRecordRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
