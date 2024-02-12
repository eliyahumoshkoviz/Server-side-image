const express = require("express"),
    router = express.Router();
const userService = require("../user/user.service");

router.post("/", async (req, res) => {
    try {

        let newUser = {
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            password: req.body.password
        }

        let result = await userService.addNewUser(newUser);
        res.send(
            {
                success: true,
                message: "User added successfully",
                deletedUser: result
            }
        );
    } catch (err) {
        res.status(err?.code ?? 400).send(err.message);
    }
});

module.exports = router;
