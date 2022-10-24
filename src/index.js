const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./config/db");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

require("./routes")(app);

connectToDatabase().then(() => {
  app.listen(PORT, () => console.log(`running on: http://localhost:${PORT}`));
});
