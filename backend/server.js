const express = require("express");
const cors = require("cors");
const ConnectDatabase = require("./Utils/Database");
const dotenv = require("dotenv");
const clientRoutes = require("./routes/clientRoutes");

dotenv.config({ path: "./Utils/config.env" });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/", clientRoutes);
const PORT = process.env.PORT;

ConnectDatabase();

// app.use((err, req, res, next) => {
//   console.error(err);

//   if (err.name === "ValidationError") {
//     return res.status(400).json({ error: err.message });
//   } else if (err.name === "UnauthorizedError") {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   return res.status(500).json({ error: "Internal Server Error" });
// });

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}...`);
});

module.exports = app;
