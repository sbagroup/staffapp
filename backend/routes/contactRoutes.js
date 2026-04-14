
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contact
router.post("/contact", async (req, res) => {
  try {
    const { name, email, telephone, address, customerId, message } = req.body;

    if (!name || !email || !telephone || !customerId || !message) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const newContact = new Contact({
      name,
      email,
      telephone,
      address: address || "",
      customerId,
      message,
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      message: "Contact saved successfully",
      data: savedContact,
    });
  } catch (err) {
    console.error("❌ Backend error:", err);

    if (err.code === 11000) {
      return res.status(400).json({ message: "Customer ID must be unique" });
    }

    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;