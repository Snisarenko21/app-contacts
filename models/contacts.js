// const fs = require('fs/promises')
const fs = require("fs/promises");

const path = require("path");
const { v4: uuidv4 } = require("uuid");
uuidv4();

const contactsPath = path.join(__dirname, "../models/contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactList = JSON.parse(contacts);
    return contactList;
  } catch (error) {
    return error.message;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.filter((contact) => contact.id === contactId);
    if (!contactById) {
      return null;
    }

    return contactById;
  } catch (error) {
    return error.message;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const deleteContact = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (deleteContact === -1) {
      return null;
    }
    const [result] = contacts.splice(deleteContact, 1);
    await updateContacts(contacts);
    console.log(result);
    return result;
  } catch (error) {
    return error.message;
  }
};

const addContact = async (body) => {
  try {
    const newContact = {
      id: uuidv4(),
      ...body,
    };
    const contacts = await listContacts();
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    return error.message;
  }
};

const updateContact = async (id, body) => {
  try {
    const contactList = await listContacts();
    const index = contactList.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    contactList[index] = { id, ...body };
    await updateContacts(contactList);
    return contactList[index];
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// const path = require("path");
// const fs = require("fs/promises");
// const uid = require("uid2");

// const contactsPath = path.join("db/contacts.json");

// const listContacts = async () => {
//   try {
//     const contactsList = await fs.readFile(contactsPath, "utf-8");
//     const parsedContactsList = JSON.parse(contactsList);

//     if (parsedContactsList.length >= 1) return parsedContactsList;
//     throw new Error("Contacts list is empty");
//   } catch (err) {
//     console.error(err);
//   }
// };

// const getContactById = async (contactId) => {
//   try {
//     const contactList = await listContacts();
//     return contactList.find((contact) => contact.id === contactId.toString());
//   } catch (err) {
//     console.error(err);
//   }
// };

// const addContact = async (name, email, phone) => {
//   try {
//     const newContact = {
//       id: uid(10),
//       name,
//       email,
//       phone,
//     };
//     const previousList = await listContacts();
//     const newList = JSON.stringify([...previousList, newContact]);
//     fs.writeFile(contactsPath, newList);
//     return listContacts();
//   } catch (err) {
//     console.error(err);
//   }
// };

// const removeContact = async (contactId) => {
//   try {
//     const list = await listContacts();
//     fs.writeFile(
//       contactsPath,
//       JSON.stringify(
//         list.filter((contact) => contact.id !== contactId.toString())
//       )
//     );
//     return listContacts();
//   } catch (err) {
//     console.error(err);
//   }
// };
// // const updateContact = async (contactId, body) => {};
// const updateContact = async (instance) => {
//   try {
//     await fs.writeFile(contactsPath, JSON.stringify(instance, null, 2));
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
