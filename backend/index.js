const express = require("express");
const router = require("./routes");
const app = express();
const PORT = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", router);

app.listen(PORT, () => {
    console.log(`app is listening to port`, PORT);
});
