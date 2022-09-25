const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.json({
      contacts,
      message: "Success",
      status: 200,
    });
  } catch (error) {
    res.json({
      message: "Error",
      status: 500,
    });
  }
};

const getOneContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const [contact] = await getContactById(contactId);
    if (!contact) {
      res.json({
        message: "Not found",
        status: 404,
      });
    }
    res.json({
      contact: contact,
      message: "Success",
      status: 200,
    });
  } catch (error) {
    res.json({
      message: "Error",
      status: 500,
    });
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);

    if (!contact) {
      res.json({
        message: "Not found",
        status: 404,
      });
    }
    res.json({
      contact,
      message: "Contact deleted",
      status: 200,
    });
  } catch (error) {
    res.json({
      message: "Server error",
      status: 500,
    });
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.json({
      contact: newContact,
      message: "Success",
      status: 201,
    });
  } catch (error) {
    res.json({
      message: "Error",
      status: 500,
    });
  }
};
const changeContact = async (req, res, next) => {
  try {
    const result = await updateContact(req.params.contactId, req.body);
    if (!result) {
      res.json({
        message: "Not found",
        status: 404,
      });
    }
    res.json({ ...result, status: 200 });
  } catch {
    res.json({
      message: "Not found",
      status: 404,
    });
  }
};

module.exports = {
  getContacts,
  getOneContactById,
  deleteContact,
  addNewContact,
  changeContact,
};
