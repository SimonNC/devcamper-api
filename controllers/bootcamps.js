const Bootcamp = require("../models/Bootcamps");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find({});
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get all bootcamps
// @route   Get /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(404).json({
        success: false,
        error: "Bootcamp not found",
      });
    }
    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Create a new bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  console.log("req.body", req.body);
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update a new bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Update bootcamp with id ${req.params.id}`,
  });
};

// @desc   DELETE a single bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Delete bootcamp with id ${req.params.id}`,
  });
};
