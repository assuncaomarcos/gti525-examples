const { Router } = require("express");
const controller = require("../controllers/products");

const router = Router();

router.route("/api/products")
    .get(controller.allProducts)
    .post(controller.addProduct);

router.route("/api/products/:prodId")
    .get(controller.findProduct)
    .put(controller.updateProduct)
    .delete(controller.deleteProduct);

module.exports = router;