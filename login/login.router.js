const express = require("express"),
    router = express.Router();
const { createToken } = require("../middleware/autu")
const userController = require("../user/user.controller");

router.post("/", async (req, res) => {
    try {
        let user = {
            name: req.body.fName,
            permission: (await userController.readOne({email: req.body.email})).permission
        }
        res.send(
            { token: createToken(user) }
        );
    } catch (err) {
        res.status(err?.code ?? 400).send(err.message);
    }
});

module.exports = router;