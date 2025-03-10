import {Router} from "express";
import * as controller from "../controllers/products.js";

const router = Router();

router.route("/api/products")
  .get(controller.allProducts)
  .post(controller.addProduct);

router.route("/api/products/:prodId")
  .get(controller.findProduct)
  .put(controller.updateProduct)
  .delete(controller.deleteProduct);

export default router;