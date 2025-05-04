require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { connectDB } = require("./config/db.js");

const prescriptionRoutes = require("./routes/prescriptions.route.js");

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api/prescriptions", prescriptionRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});

app.use(cors({ origin: "http://localhost:3000" }));
