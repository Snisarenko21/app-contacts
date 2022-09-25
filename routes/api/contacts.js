const express = require("express");

const router = express.Router();
const { contactValidation } = require("../../middlewares/validation");

const {
  getContacts,
  getOneContactById,
  deleteContact,
  addNewContact,
  changeContact,
} = require("../../controllers/contactsController");

router.get("/", getContacts);

router.get("/:contactId", getOneContactById);

router.post("/", contactValidation, addNewContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", contactValidation, changeContact);

module.exports = router;
