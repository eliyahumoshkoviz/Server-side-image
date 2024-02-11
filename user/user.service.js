const userController = require("./user.controller");
const valid = require("../function/validation");

async function addNewUser(data) {
    // Makes sure the data is not empty and then checks if the required fields exist
    if (!data?.email || !data?.fName || !data?.lName || !data?.password) {
        throw {
            code: 400,
            message:
                "input error - missing required fields email, password, fName, lName",
        };
    }

    // check if email exist
    let user = await userController.readOne({ email: data.email });
    // if exist and user active throw code 400
    if (user && user.isActive)
        throw { code: 400, message: "user is exist" };

    // check object (by schema)
    if (await valid.handleValidation(data)) {
        return user && !user.isActive
            ? await userController.create(user)
            : await userController.create(data);
    }
}

async function GetUserInformation({email}) {

    // Makes sure the email fields exist
    if (!email) {
        throw {
            code: 400,
            message:
                "input error - missing email",
        };
    }
    
    // check if email exist or user exist but not active
    let user = await userController.readOne({ email: email });
    // if not exist or not active throw code 400
    if (!user || !user.isActive) {
        throw { code: 400, message: "user isn't exist" };
    }

    return user;
}

async function del(data) {
    // Makes sure the data is not empty and then checks if the required fields exist
    if (!data?.email || !data?.password) {
        throw {
            code: 400,
            message: "input error - missing required fields email, password",
        };
    }

    // check if email exist
    let user = await userController.readUserWithPassword({ email: data.email });
    if (!user) throw { code: 400, message: "input error - email isn't exist" };

    //Checks if the email and password match the data
    if (data.password !== user.password) {
        throw {
            code: 400,
            message: "input error - the password does not match the email",
        };
    }
    return await userController.del({ _id: user.id });
}

module.exports = { addNewUser, del, GetUserInformation };
