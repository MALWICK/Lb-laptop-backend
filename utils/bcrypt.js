const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

async function exampleUsage() {
  const password = "motdepasse123";

  const hashedPassword = await hashPassword(password);
  console.log("Mot de passe crypté :", hashedPassword);

  const isMatch = await comparePassword(password, hashedPassword);
  console.log("Correspondance du mot de passe :", isMatch);
}

// exampleUsage();

module.exports={
    hashPassword,
    comparePassword
}