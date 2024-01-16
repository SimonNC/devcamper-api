const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  res.status(200).json({ success: true, message: "show all bootcamps" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: `show bootcamp with id ${req.params.id}`,
  });
});

router.post("", (req, res) => {
  res.status(200).json({ success: true, message: "Create new boot camp" });
});
router.put("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: `Update bootcamp with id ${req.params.id}`,
  });
});
router.delete("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: `Delete bootcamp with id ${req.params.id}`,
  });
});

module.exports = router;
