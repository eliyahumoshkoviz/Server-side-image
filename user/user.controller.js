const { userModel } = require("./usre.modle");


async function create(data) {
    //If a user exists but is not active, updates that it is active,
    //if not, creates a new user
    return data?.isActive === false
        ? (await update({ email: data.email }, { isActive: true })).modifiedCount > 0
            //If successful, the function will return the user's information
            // if it does not throw an error
            ? await readUserWithPassword({ _id: data._id })
            : Promise.reject(new Error("Update failed"))
        : await userModel.create(data);
}


async function read(object = {}) {
    return await userModel.find({ ...object, isActive: true });
}

async function readOne(object = {}) {
    return await userModel.findOne(object);
}

async function readUserWithPassword(object = {}) {
    return await userModel.findOne(object).select("+password");
}

async function update(filter, data) {
    return await userModel.updateOne(filter, data);
}
async function updateById(id, data) {
    return await userModel.updateOne({ _id: id }, data);
}

async function del(id) {
    return await updateById(id, { isActive: false });
}


module.exports = { create, read, readOne, update, updateById, del, readUserWithPassword };
