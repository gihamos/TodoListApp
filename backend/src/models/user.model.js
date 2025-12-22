const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    unique: false,
    required: true,
    description:"nom de la personne"
  },
  last_name: {
  type: String,
  unique: false,
  required: true,
  description:"prenom de la personne"
},
adress: {
  type: String,
  unique: false,
  required: false,
  description:"son adresse de la personne"
},
  email: {
    type: String,
    unique: true,
    required: true,
    description:"adresse mail de la personne ex: example@example.fr"
  },
  password: {
    type: String,
    required: true,
    description:"ton mot de passe"
  },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;