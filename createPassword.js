const bcrypt = require('bcrypt');

// Since I have created first user manually, I have to hash the password manually. 
async function createHashedPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed password:', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    return null;
  }
}

// Every user has the same password for simplicity.
const userPassword = 'user123';
// Admin password is different from user password.
const adminPassword = 'admin123';
createHashedPassword(userPassword);
