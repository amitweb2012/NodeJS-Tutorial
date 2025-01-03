const express = require('express');
const app = express();

app.get("/", (req, res) => {
  res.send("home page");
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("something went wrong");
})

const port = 3000;

app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});
