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

async function GetUserInfo(data) {

    // Makes sure the data exist
    if (!data) {
        throw {
            code: 400,
            message:
                "input error - missing data",
        };
    }

    // check if user exist or user exist but not active
    let user = await userController.readOne(data);
    // if not exist or not active throw code 400
    if (!user || !user.isActive) {
        throw { code: 400, message: "user isn't exist" };
    }

    return user;
}

async function updateFieldById(id, data) {

    // Makes sure the id and data exist
    if (!id || !data) {
        throw {
            code: 400,
            message:
                "input error - missing id or data",
        };
    }

    //Make sure the user changes only this field (Only one of these fields can change)
    const modifiableFields = ["fName", "lName", "email", "password"];
    const field = modifiableFields.find((field) =>
        Object.keys(data).includes(field));

    if (!field) {
        throw {
            code: 400,
            message:
                "input error - you can't change this field",
        };
    }
 
    // check if user exist or user exist but not active
    let user = await userController.readOne(id);
    // if not exist or not active throw code 400
    if (!user || !user.isActive) {
        throw { code: 400, message: "user isn't exist" };
    }
  
    // check object (by schema)
    if (!await valid.validateSingleField(field, data[field])) {
        throw { code: 400, message: "invalid fields" };
    }

    return await userController.updateById(id, data)

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

module.exports = { addNewUser, del, GetUserInfo, updateFieldById };
