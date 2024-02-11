const loginController = require("./login.controller");
const { createToken } = require("../middleware/autu")


async function isUserExists({email,password}) {

    // Makes sure the required fields exist
    if (!email || !password) {
        throw {
            code: 400,
            message:
                "input error - missing required fields email, password",
        };
    }

    // check if email exist or user exist but not active
    let user = await loginController.readUserWithPassword({ email: email });
    // if not exist or not active throw code 400
    if (!user || !user.isActive) {
        throw { code: 400, message: "user isn't exist" };
    }

    //Checks if the email and password match the data
    if (password !== user.password) {
        throw {
            code: 400,
            message: "input error - the password does not match the email",
        };
    }

    return { token: createToken({ name: user.fName, permission: user.permission }) }

}

module.exports = { isUserExists };
