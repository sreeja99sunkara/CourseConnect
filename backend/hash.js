const bcrypt = require("bcrypt");

const password = "12345"; // your admin password

bcrypt.hash(password, 10).then((hash) => {
  console.log("Hashed password:", hash);
});