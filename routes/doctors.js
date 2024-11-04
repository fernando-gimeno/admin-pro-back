/* 
  Route: /api/doctors
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctors");

const router = Router();

router.post("/", [], createDoctor);
router.get("/", validateJWT, getDoctors);
router.get("/:uid", validateJWT, getDoctor);
router.put("/:uid", [], updateDoctor);
router.delete("/:uid", validateJWT, deleteDoctor);

module.exports = router;
