const router = require("express").Router();
const postController = require("../controllers/postController");
const requiredUser = require("../middlewares/requiredUser");
const requireAdmin = require("../middlewares/requireAdmin")

router.get("/all",requiredUser,postController.allPostController);
router.post("/like",requiredUser,postController.likeController);
router.post("/create",requireAdmin,postController.createPostController);
router.post("/dislike",requiredUser,postController.dislikesController);
router.post("/prefrences",requiredUser,postController.addPrefrences);
router.post("/bulk",postController.bulkAddController);

module.exports = router;