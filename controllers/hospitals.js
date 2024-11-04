const Hospital = require("../models/hospital");

const createHospital = async (req, res) => {
  const { name } = req.body;

  try {
    const hospital = new Hospital({ name });

    await hospital.save();

    res.json({
      ok: true,
      msg: "Hospital created",
      hospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const getHospitals = async (req, res) => {
  const hospitals = await Hospital.find();
  res.json({
    ok: true,
    msg: "Get all hospitals",
    hospitals,
  });
};

const getHospital = async (req, res) => {
  res.json({
    ok: true,
    msg: `Get hospital with UID: ${req.params.uid}`,
  });
};

const updateHospital = async (req, res) => {
  res.json({
    ok: true,
    msg: `Update hospital with UID: ${req.params.uid}`,
  });
};

const deleteHospital = async (req, res) => {
  res.json({
    ok: true,
    msg: `Delete hospital with UID ${req.params.uid}`,
  });
};

module.exports = {
  createHospital,
  getHospitals,
  getHospital,
  updateHospital,
  deleteHospital,
};
