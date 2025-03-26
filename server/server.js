const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// Connect to the MongoDB database
connectDB(); 

// ✅ Apply CORS middleware globally BEFORE defining routes
app.use(cors({
    origin: "http://localhost:3000", // Allow frontend access
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// ✅ Define Routes
app.use('/api/items', require("./routes/items"));
app.use('/api/payment', require("./routes/payment"));
app.use('/api/orders2', require("./routes/newroute")); 
app.use("/api/auth", require("./routes/auth")); // Add this if missing

// Start Server
app.listen(PORT, () => console.log("Server is running on port", PORT));
