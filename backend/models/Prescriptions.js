const mongoose = require("mongoose");
const prescriptionsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfPrescription: {
      type: String,
      required: true,
    },
    inscription: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    doctorInformation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionsSchema);

module.exports = Prescription;
