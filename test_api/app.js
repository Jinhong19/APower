const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.get("/testpath", (req, res) => {
  res.send("hello from test api");
});

app.listen(PORT, () => {
  console.log("testapi on local PORT " + PORT);
});
