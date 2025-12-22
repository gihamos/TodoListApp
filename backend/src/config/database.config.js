const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("La connexion à mongoDB a bien été effectuée !")
    } catch (error) {
        console.error("Une erreur est survenue lors de la connexion à la base de données mongoDB :", error);
        process.exit(1);
    }
};

module.exports = connectDB;