const { listContacts, getContactById, removeContact, addContact } = require('./contacts.js');
const { Command } = require("commander");

const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
        listContacts();
        console.log('Contacts list:')
        break;

    case "get":
        getContactById(id);
        console.log(`Contact with id: ${id}`)
        break;

    case "add":
        addContact(name, email, phone)
        console.log(`Contact with name: ${name}, email: ${email}, phone: ${phone} added`)
        break;

    case "remove":
        removeContact(id)
        console.log(`Contact with id: ${id} removed`)
        break;

    default:
        console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);
//node index.js --action="list"
//node index.js --action="add" --name="Yuriy" --email="ydovzhyk@gmail.com" --phone="(050) 356-2938"
//node index.js --action="remove" --id=3
//node index.js --action="get" --id=5