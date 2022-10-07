
const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contactsList = JSON.parse(data);
        console.table(contactsList);
    } catch (error) {
        console.log(error);
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const contactsList = JSON.parse(data);

        let targetContact = contactsList.find(items => items.id === contactId);
        if (!targetContact) {
            console.log('Contact not found');
            return;
        }
        console.table(targetContact);
    } catch (error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath);
        const contactsList = JSON.parse(data);

        let contactRemoved = contactsList.filter(items => items.id !== contactId);

        if (!contactRemoved) {
            console.log('Contact not found');
            return;
        }

        fs.truncate(contactsPath);

        fs.writeFile(contactsPath, JSON.stringify(contactRemoved))
            console.log('Contact deleted successfully');
            console.table(contactRemoved);
            
    } catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
    const newContact = [{"id": shortid.generate(), "name": name, "email": email,"phone": phone}];
    try {
        const data = await fs.readFile(contactsPath);
        const contactsList = JSON.parse(data);

        let addContact = contactsList.concat(newContact);

        fs.truncate(contactsPath);

        fs.writeFile(contactsPath, JSON.stringify(addContact));
            console.log('Contact successfully recorded');
            console.table(addContact);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
