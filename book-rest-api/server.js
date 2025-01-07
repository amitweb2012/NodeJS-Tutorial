const express = require('express');
const app = express();
const connectToDB = require('./db/db');
const bookRoutes = require('./routes/bookRoutes');

connectToDB();
app.use(express.json());
app.use("/api/books", bookRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));