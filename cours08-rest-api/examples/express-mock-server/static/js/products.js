import actions from "./actions.js";

const PROD_FIELDS = ["name", "description", "price"];
const ACCESS_POINT = "/api/products/";

actions.setItemFields(PROD_FIELDS);
actions.setAccessPoint(ACCESS_POINT);
actions.init();