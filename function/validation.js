const handleValidation = async (data) => {
    const requiredFields = ["fName", "lName", "email", "password"];

    const isValid = requiredFields.every((field) =>
        Object.keys(data).includes(field)
    );

    //When registering, only 4 fields are required,
    //but when connecting, additional fields are added
    //by the token useful for admin

    const isAuth = Object.keys(data).includes("auth");
    const flag = requiredFields.length === Object.keys(data).length
        || isAuth && requiredFields.length + 1 === Object.keys(data).length;

    if (!isValid || !flag) {
        throw new Error("Invalid user data Fields do not match the schema.");
    }

    if (data.email && !validEmail(data.email)) {
        throw new Error("Invalid email address.");
    }

    if (data.password && !validPassword(data.password)) {
        throw new Error("Invalid password.");
    }

    return true;
};

const validateSingleField = async (field, value) => {
    if (field === "email") {
        return validEmail(value);
    }
    if (field === "password") {
        return validPassword(value);
    }
    return true;

}

module.exports = { handleValidation, validateSingleField };


const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

function validPassword(password) {
    if (password.length < 6 || password.length > 12) {
        return false;
    }

    // Make sure at least one letter is present
    if (!hasEnglishLetter(password)) {
        return false;
    }

    // Make sure at least one digit is present
    if (!hasDigit(password)) {
        return false;
    }

    // Make sure there are no characters other than English letters and numbers
    if (!isAlphanumeric(password)) {
        return false;
    }

    return true;
}

function hasDigit(str) {
    return /\d/.test(str);
}

function hasEnglishLetter(str) {
    return /[a-zA-Z]/.test(str);
}

function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

