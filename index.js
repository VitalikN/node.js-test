const allContacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const getAll = await allContacts.listContacts();
      return console.log(getAll);

    case "get":
      const contact = await allContacts.getContactById(id);
      return console.log(contact);

    case "add":
      const addContact = await allContacts.addContact(name, email, phone);
      return console.log(addContact);

    case "remove":
      const removeContact = await allContacts.removeContact(id);
      return console.log(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);
