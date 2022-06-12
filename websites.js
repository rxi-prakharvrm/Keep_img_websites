const chalk = require("chalk");
const fs = require("fs");

// Adding a website to the list
const addWebsite = (name, url, description, genre, date, time) => {
  // Capitalize
  name = name.charAt(0).toUpperCase() + name.slice(1);
  description = description.charAt(0).toUpperCase() + description.slice(1);

  // Capitalize first letter of each word in a string
  const splitGenre = genre.split(" ");
  const splitGenreCapitalize = splitGenre.map((a) => {
    return a.charAt(0).toUpperCase() + a.slice(1);
  });
  genre = splitGenreCapitalize.join(" ");

  // Lower Case
  url = url.toLowerCase();

  console.log(name);
  const websites = loadWebsites();
  const duplicateWebsite = websites.find(
    (website) => website.name.toUpperCase() === name.toUpperCase()
  );
  // console.log(duplicateWebsite);

  if (!duplicateWebsite) {
    websites.unshift({
      name,
      url,
      description,
      genre,
      date,
      time,
    });
    console.log(chalk.bgGreen("Website Added"));
  } else {
    console.log(chalk.red.inverse("Website url Already registered!"));
  }
  saveWebsites(websites);
};

// Removing the website form the list
const removeWebsite = (name) => {
  const websites = loadWebsites();
  const websitesToKeep = websites.filter((website) => {
    return website.name.toUpperCase() !== name.toUpperCase();
  });

  if (websites.length > websitesToKeep.length) {
    console.log(chalk.green.inverse("Website Removed"));
    saveWebsites(websitesToKeep);
  } else {
    console.log(chalk.red.inverse("No Website found!"));
  }
};

// Lising the websites fromt the list
const listWebsites = () => {
  const websites = loadWebsites();
  var counter = 1;
  console.log(chalk.yellow.bold("Your websites ----------"));
  websites.forEach((website) => {
    console.log(
      chalk.blue(
        counter++ +
          "." +
          website.name +
          " (" +
          chalk.greenBright(website.url) +
          ")"
      )
    );
  });
};

// Searching website
const searchWebsite = (name) => {
  const websites = loadWebsites();
  const foundWebsite = websites.find(
    (website) => website.name.toUpperCase() === name.toUpperCase()
  );
  if (foundWebsite) {
    console.log(chalk.yellow.bold("You website details ----------"));
    console.log("Name: " + chalk.blue(foundWebsite.name));
    console.log("URL: " + chalk.blue(foundWebsite.url));
    console.log("Description: " + chalk.blue(foundWebsite.description));
    console.log("Genre: " + chalk.blue(foundWebsite.genre));
    console.log("Date: " + chalk.blue(foundWebsite.date));
    console.log("Time: " + chalk.blue(foundWebsite.time));
  } else {
    console.log(chalk.red.inverse("Website not found!"));
  }
};

const saveWebsites = (websites) =>
  fs.writeFileSync("websites_list.json", JSON.stringify(websites));

// Loading websites
const loadWebsites = () => {
  try {
    const websitesBuffer = fs.readFileSync("websites_list.json");
    const websitesJSON = websitesBuffer.toString();
    return JSON.parse(websitesJSON);
  } catch (err) {
    return [];
  }
};

module.exports = {
  addWebsite,
  removeWebsite,
  listWebsites,
  searchWebsite,
};
