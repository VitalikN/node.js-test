const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const getAllContacts = await listContacts();
  const result = getAllContacts.find(({ id }) => id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const getAllContacts = await listContacts();
  const idx = getAllContacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) {
    return null;
  }
  const [result] = getAllContacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(getAllContacts, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const getAllContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  getAllContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(getAllContacts, null, 2));
  return newContact;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
