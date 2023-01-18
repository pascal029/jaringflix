if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { mongoConnect } = require("./config/mongo");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;
const router = require("./routes/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", router);

mongoConnect().then((database) => {
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
});
