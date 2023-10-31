const { Router } = require("express");
const controller = require("../controllers/users");

const router = Router();

router.route("/api/users")
    .get(controller.allUsers)
    .post(controller.addUser);

router.route("/api/users/:userId")
    .get(controller.findUser)
    .put(controller.updateUser)
    .delete(controller.deleteUser);

module.exports = router;