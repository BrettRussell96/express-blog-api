const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()


// Compare raw password to encrypted password
async function comparePasswords(plaintextPassword, encryptedPassword) {
    let doesPasswordMatch = false;

    doesPasswordMatch = await bcrypt.compare(plaintextPassword, encryptedPassword);

    return doesPasswordMatch
}

function createJwt(userId){
    let newJwt = jwt.sign(
        // Payload of data
        {
            id: userId
        },
        // secret key for JWT signature
        process.env.JWT_KEY,

        // Options for JWT expiry
        {
            expiresIn: "7d"
        }       
    );

    return newJwt;
}

function validateJwt(jwtToValidate){
    let isJwtValid = false;

    jwt.verify(jwtToValidate, process.env.JWT_KEY, (error, decodedJwt) => {
        if (error){
            throw new Error("User JWT is not valid!");
        }

        console.log("Decoded JWT data: ");
        console.log(decodedJwt);
        isJwtValid = true;
    });

    return isJwtValid;
}

module.exports = {
    comparePasswords,
    createJwt,
    validateJwt
}