/* 
    Route: /api/users
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    check("password", "The password is required")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);
router.get("/", validateJWT, getUsers);
router.get("/:uid", validateJWT, getUser);
router.put(
  "/:uid",
  [
    validateJWT,
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    check("role", "The role is required").not().isEmpty(),
    validateFields,
  ],
  updateUser
);
router.delete("/:uid", validateJWT, deleteUser);

module.exports = router;
