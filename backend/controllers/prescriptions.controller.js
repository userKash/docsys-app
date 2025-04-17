const Prescription = require("../models/Prescriptions.js");
const mongoose = require("mongoose");

const getPrescriptions = async (req, res) => {
  try {
    const prescription = await Prescription.find();
    res.status(200).json({ success: true, data: prescription });
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createPrescription = async (req, res) => {
  const prescription = req.body;

  if (
    !prescription.name ||
    !prescription.age ||
    !prescription.gender ||
    !prescription.dateOfPrescription ||
    !prescription.inscription ||
    !prescription.instructions ||
    !prescription.doctorInformation
  ) {
    return res.status(400).json({ success: false, message: "Fields required" });
  }
  const newPrescription = new Prescription(prescription);

  try {
    await newPrescription.save();
    res.status(201).json({ success: true, data: newPrescription });
  } catch (error) {
    console.error("Error saving prescription:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updatePrescription = async (req, res) => {
  const { id } = req.params;
  const prescription = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Prescription not found" });
  }

  try {
    await Prescription.findByIdAndUpdate(id, prescription, { new: true });
    res.status(200).json({ success: true, data: prescription });
  } catch (error) {
    console.error("Error updating prescription:", error);
    res.status(404).json({ success: false, message: "Server error" });
  }
};

const deletePrescription = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Prescription not found" });
  }

  try {
    await Prescription.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Prescription deleted" });
  } catch (error) {
    console.error("Error deleting prescription:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getPrescriptions,
  createPrescription,
  updatePrescription,
  deletePrescription,
};
