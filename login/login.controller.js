const { userModel } = require("../user/usre.modle");

async function readUserWithPassword(object = {}) {
    return await userModel.findOne(object).select("+password");
}

module.exports = { readUserWithPassword };
