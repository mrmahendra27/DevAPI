exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ status: true, data: "List of Bootcamps." });
};

exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ status: true, data: `Data of bootcamp ${req.params.id}.` });
};

exports.createBootcamp = (req, res, next) => {
  res
    .status(201)
    .json({ status: true, data: "Bootcamp created successfully." });
};

exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    status: true,
    data: `Bootcamp ${req.params.id} updated successfully.`,
  });
};

exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    status: true,
    data: `Bootcamp ${req.params.id} deleted successfully.`,
  });
};
