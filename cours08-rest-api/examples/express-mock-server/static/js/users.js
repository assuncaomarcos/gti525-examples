import actions from "./actions.js";

const USER_FIELDS = ["lastName", "firstName", "address", "city", "birthday"];
const ACCESS_POINT = "/api/users/";

actions.setItemFields(USER_FIELDS);
actions.setAccessPoint(ACCESS_POINT);
actions.init();