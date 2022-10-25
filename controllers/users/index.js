const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");

module.exports = {
  register,
  getCurrent,
  login,
  logout,
  updateSubscription,
  updateAvatar,
  verify,
};
