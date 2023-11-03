// import mongoose from 'mongoose'
const mongoose = require("mongoose");

try {
  mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
} catch (error) {
  console.log(error);
}

// export default mongoose
module.exports = mongoose;
