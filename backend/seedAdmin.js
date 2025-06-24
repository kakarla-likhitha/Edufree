const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10); // You can change the password
  const admin = new Admin({
    username: "admin",
    password: hashedPassword,
  });

  await admin.save();
  console.log("Admin created");
  mongoose.disconnect();
});
