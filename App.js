const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbconnect');
const cookieParser = require('cookie-parser');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true
}));

// Database connection
dbConnect();

// Routes imports
const userauth = require('./routes/userroute')
const todoDatas = require('./routes/todoroute')

// Register routes
app.use("/user", userauth);
app.use("/todo", todoDatas);

// Start server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



