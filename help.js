const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

async function readContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contactsList = JSON.parse(data);
        return contactsList;
    } catch (error) {
        console.log(error);
    }
}

async function writeContacts(contactsData) {
    try {
        fs.truncate(contactsPath);
        fs.writeFile(contactsPath, JSON.stringify(contactsData))
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    readContacts,
    writeContacts,
}