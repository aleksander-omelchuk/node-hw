const fsPromises = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');
require('colors');

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, 'utf-8');
    const parsedContacts = JSON.parse(data);
    if (parsedContacts.length === 0) {
      return console.error('List of contacts is empty!'.bgBlue);
    }
    return parsedContacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath, 'utf-8');
    const parsedContacts = JSON.parse(data);
    const contact = parsedContacts.find(
      ({ id }) => Number(id) === Number(contactId)
    );

    if (!contact)
      return console.error(
        `Сontact with id: ${contactId} was not found!`.bgRed
      );

    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath, 'utf-8');
    const parsedContacts = JSON.parse(data);
    const contactIndex = parsedContacts.findIndex(
      ({ id }) => Number(id) === Number(contactId)
    );

    if (contactIndex === -1) {
      return console.error(
        `contact with ID ${contactId} was not found! `.bgRed
      );
    }

    const newContacts = parsedContacts.filter(
      ({ id }) => Number(id) !== Number(contactId)
    );

    await fsPromises.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`contact with ID: ${contactId}  was deleted`.bgGreen);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fsPromises.readFile(contactsPath, 'utf-8');
    const parsedContacts = JSON.parse(data);
    const newContact = { id: nanoid(), name, email, phone };
    const newContacts = [...parsedContacts, newContact];
    await fsPromises.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`contact with name: ${name}  was added`.bgBlue);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
