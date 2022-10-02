const path = require("path");
const fs = require("fs/promises");
const uid = require("uid2");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf-8");
    const parsedContactsList = JSON.parse(contactsList);

    if (parsedContactsList.length >= 1) return parsedContactsList;
    throw new Error("Contacts list is empty");
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactList = await listContacts();
    return contactList.find((contact) => contact.id === contactId.toString());
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = {
      id: uid(10),
      name,
      email,
      phone,
    };
    const previousList = await listContacts();
    const newList = JSON.stringify([...previousList, newContact]);
    fs.writeFile(contactsPath, newList);
    return listContacts();
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const list = await listContacts();
    fs.writeFile(
      contactsPath,
      JSON.stringify(
        list.filter((contact) => contact.id !== contactId.toString())
      )
    );
    return listContacts();
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (instance) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(instance, null, 2));
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
