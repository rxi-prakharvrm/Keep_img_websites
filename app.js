const yargs = require("yargs");
const websites = require("./websites");

// command for adding a website into the websites_list.json
var date = new Date().toISOString().slice(0, 19).replace("T", " ");

yargs.command({
  command: "add",
  describe: "Add Website",
  builder: {
    name: {
      describe: "Website name",
      demandOptions: true,
      type: "string",
    },
    url: {
      describe: "Website url",
      demandOptions: true,
      type: "string",
    },
    description: {
      describe: "Website Description",
      demandOptions: true,
      type: "string",
    },
  },
  handler(argv) {
    websites.addWebsite(
      argv.name,
      argv.url,
      argv.description,
      argv.genre,
      date
    );
  },
});

// Remove website command
yargs.command({
  command: "remove",
  describe: "Remove website",
  builder: {
    name: {
      describe: "Website name",
      demandOptions: true,
      type: "string",
    },
  },
  handler(argv) {
    websites.removeWebsite(argv.name);
  },
});

// Command for listing all the websites from the list
yargs.command({
  command: "list",
  describe: "Lists all websites",
  handler() {
    websites.listWebsites();
  },
});

// Command for searching website
yargs.command({
  command: "search",
  describe: "Search Website",
  builder: {
    name: {
      describe: "Website name",
      demandOptions: true,
      type: "string",
    },
  },
  handler(argv) {
    websites.searchWebsite(argv.name);
  },
});

// Parsing yargs
yargs.parse();
