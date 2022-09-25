const Bootcamp = require("../models/Bootcamp");

/**
 * @desc Get list of all existing bootcamps
 * @route GET /api/v1/bootcamp
 * @access Public
 */
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
      status: true,
      total: bootcamps.length,
      data: bootcamps,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      data: err,
    });
  }
};

/**
 * @desc Get an existing bootcamp
 * @route GET /api/v1/bootcamp/:id
 * @access Public
 */
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findOne({ _id: req.params.id });

    if (!bootcamp) {
      res.status(400).json({
        status: false,
      });
    }

    res.status(200).json({
      status: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      data: err,
    });
  }
};

/**
 * @desc Create new bootcamp
 * @route POST /api/v1/bootcamp
 * @access Public
 */
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      status: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      data: err,
    });
  }
};

/**
 * @desc Update existing bootcamp
 * @route PUT /api/v1/bootcamp/:id
 * @access Public
 */
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      res.status(400).json({
        status: false,
      });
    }

    res.status(200).json({
      status: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      data: err,
    });
  }
};

/**
 * @desc Delete existing bootcamp
 * @route DELETE /api/v1/bootcamp/:id
 * @access Public
 */
exports.deleteBootcamp = async (req, res, next) => {
  try {
    await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      res.status(400).json({
        status: false,
      });
    }

    res.status(204).json({
      status: true,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      data: err,
    });
  }
};
