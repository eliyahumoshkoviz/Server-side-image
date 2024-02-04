const express = require("express"),
    router = express.Router();

const userService = require("./user.service");

router.post("/", async (req, res) => {
    try {
        let result = await userService.addNewUser(req.body);
        console.log("User added successfully");
        res.send(result);
    } catch (err) {
        res.status(err?.code ?? 400).send(err.message);
    }
});

router.delete("/", async (req, res) => {
    try {
        let result = await userService.del(req.body);
        console.log("User deleted successfully");
        res.send(result);
    } catch (error) {
        res.status(err?.code ?? 400).send(err.message);
    }
});

module.exports = router;
