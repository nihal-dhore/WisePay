const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const argon2 = require("argon2");

mongoose.connect(
    "mongodb+srv://nihaldhore:DaDdKMVCllgD72zW@cluster0.meehyvw.mongodb.net/paytm"
);

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password_hash: { 
        type: String, 
        required: true 
    },
    firstName: {
        type : String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim : true
    }
});

UserSchema.methods.createHash = async function (plainPassword) {
    const saltRound = 10;

    // First method
    // const salt = await bcrypt.genSalt(saltRound);
    // console.log(salt);
    // return await bcrypt.hash(plainPassword, salt);

    // Second Method creating salt and hash in a single method
    // return await bcrypt.hash(plainPassword, saltRound);

    // Hashing also can be done using PBKDF2 "Password-Based Key Derivation Function 2"
    // Argon2 is the newest hashing alogorithm out of mentioned three.

    return await argon2.hash(plainPassword);
};

UserSchema.methods.validatePassword = async function (userPassword) {
    // return await bcrypt.compare(userPassword, this.password_hash);

    return await argon2.verify(this.password_hash, userPassword);
};

const AccountSchema = new mongoose.Schema({
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required : true
        },
    ],

    balance: {
        type : Number,
        required : true
    }
});

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = { 
    User, 
    Account 
};
