import {Router} from "express";
import * as controller from "../controllers/users.js";

const router = Router();

router.route("/api/users")
  .get(controller.allUsers)
  .post(controller.addUser);

router.route("/api/users/:userId")
  .get(controller.findUser)
  .put(controller.updateUser)
  .delete(controller.deleteUser);

export default router;