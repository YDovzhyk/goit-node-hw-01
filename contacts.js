const { readContacts, writeContacts } = require('./help.js');
const shortid = require('shortid');

async function listContacts() {
    try {
        readContacts().then(data => console.table(data));
    } catch (error) {
        console.log(error);
    }
}

async function getContactById(contactId) {
    try {
        readContacts().then(data => {
            let contactsData = data.find(items => items.id === contactId);
                if (!contactsData) {
                    console.log('Contact not found');
                    return;
                }
            console.table(contactsData);
        });
    } catch (error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try {
        readContacts().then(data => {
            let contactsData = data.filter(items => items.id !== contactId);
        
            writeContacts(contactsData);
            console.table(contactsData);
        });
    } catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
    const newContact = [{"id": shortid.generate(), "name": name, "email": email,"phone": phone}];
    try {
        readContacts().then(data => {
            let contactsData = data.concat(newContact);

            writeContacts(contactsData);
            console.table(contactsData);
        });
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