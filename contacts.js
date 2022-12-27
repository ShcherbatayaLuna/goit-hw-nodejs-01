const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

function listContacts() {
  readFile(contactsPath, "utf-8")
    .then((data) => console.log(data))
    .catch((error) => console.error(error.message));
}

function getContactById(contactId) {
  readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find((c) => Number(c.id) === Number(contactId));
      console.log(contact);
    })
    .catch((error) => console.error(error.message));
}

function removeContact(contactId) {
  readFile(contactsPath, "utf-8")
    .then((data) => {
      let foundContact = false;
      const contacts = JSON.parse(data);
      const contact = contacts.filter((c) => {
        if (Number(c.id) === Number(contactId)) {
          foundContact = true;
        }
        return Number(c.id) !== Number(contactId);
      });
      if (!foundContact) {
        console.log(`Not found contact with id ${contactId}`);
        return;
      }
      writeFile(`${contactsPath}`, JSON.stringify(contact))
        .then(() => console.log(contact))
        .catch((error) => console.error(error.message))
        .finally(() => (foundContact = false));
    })
    .catch((error) => console.error(error.message));
}

function addContact(name, email, phone) {
  const contactNew = { id: null, name, email, phone };
  readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      contacts.forEach((element) => {
        contactNew.id = String(Number(element.id) + 1);
      });
      contacts.push(contactNew);
      writeFile(`${contactsPath}`, JSON.stringify(contacts))
        .then(() => console.log(contacts))
        .catch((error) => console.error(error.message));
    })
    .catch((error) => console.error(error.message));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
