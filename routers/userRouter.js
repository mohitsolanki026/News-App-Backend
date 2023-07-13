const router = require("express").Router()
const userController = require("../controllers/userController");
const requireAdmin = require("../middlewares/requireAdmin");

router.get("/all",requireAdmin,userController.allUsersController);
router.put("/update",requireAdmin,userController.updateUser);
router.put("/admin/:id",requireAdmin,userController.makeAdmin);
router.delete("/delete/:id",requireAdmin,userController.deleteUser);

module.exports = router;