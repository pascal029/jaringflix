const express = require("express");
const app = express();
const port = 4000;
const router = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);

app.listen(port, () => console.log(`running on port:${port}`));
