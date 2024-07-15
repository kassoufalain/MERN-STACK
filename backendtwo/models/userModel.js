const mongoose = require('mongoose');

let User;

try {
  // Try to fetch the existing model
  User = mongoose.model('User');
} catch (error) {
  // Define the model if it doesn't exist
  const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  User = mongoose.model('User', UserSchema);
}

module.exports = User;
