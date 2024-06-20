const mongoose = require('mongoose');

async function databaseConnect(){
    let databaseURL = process.env.DATABASE_URL || "mongodb://27017/blog-db";

    await mongoose.connect(databaseURL);
    console.log("Database connecting completed!");
}

module.exports = {
    databaseConnect
}
