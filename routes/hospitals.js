/* 
  Route: /api/hospitals
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { createHospital, getHospitals, getHospital, updateHospital, deleteHospital } = require("../controllers/hospitals");

const router = Router();

router.post("/", [], createHospital);
router.get("/", validateJWT, getHospitals);
router.get("/:uid", validateJWT, getHospital);
router.put("/:uid", [], updateHospital);
router.delete("/:uid", validateJWT, deleteHospital);

module.exports = router;
