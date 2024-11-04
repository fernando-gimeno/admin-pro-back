const Doctor = require("../models/doctor");

const createDoctor = async (req, res) => {
  const { name, hospital } = req.body;

  try {
    const doctor = new Doctor({ name, hospital });

    await doctor.save();

    res.json({
      ok: true,
      msg: "Doctor created",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.json({
    ok: true,
    msg: "Get all doctors",
    doctors,
  });
};

const getDoctor = async (req, res) => {
  res.json({
    ok: true,
    msg: `Get doctor with UID: ${req.params.uid}`,
  });
};

const updateDoctor = async (req, res) => {
  res.json({
    ok: true,
    msg: `Update doctor with UID: ${req.params.uid}`,
  });
};

const deleteDoctor = async (req, res) => {
  res.json({
    ok: true,
    msg: `Delete doctor with UID ${req.params.uid}`,
  });
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};
