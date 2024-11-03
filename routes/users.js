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
router.get("/", getUsers);
router.get("/:uid", getUser);
router.put(
  "/:uid",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    check("role", "The role is required").not().isEmpty(),
  ],
  updateUser
);
router.delete("/:id", deleteUser);

module.exports = router;
