const mongoose = require("mongoose");

const ConnectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then((res) => console.log("Database Connected!"))
        .catch((err) => console.log("ERROR", err));
};

module.exports = ConnectDatabase;
