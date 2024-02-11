const express = require("express"),
    router = express.Router();

const userService = require("./user.service");
const { authenticate } = require("../middleware/autu")

router.post("/", authenticate, async (req, res) => {
    try {
        let result = await userService.addNewUser(req.body);
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

router.get("/", authenticate, async (req, res) => {
    try {
        let result = await userService.GetUserInformation({email: req.body.email});
        res.send(
            {
                deletedUser: result
            }
        );
    } catch (err) {
        res.status(err?.code ?? 400).send(err.message);
    }
});

router.delete("/", authenticate, async (req, res) => {
    try {
        let result = await userService.del(req.body);
        res.status(result.modifiedCount > 0 ? 200 : 400).send(
            {
                success: result.modifiedCount > 0,
                message: result.modifiedCount > 0 ? "User deleted successfully." : "User not found",
                deletedUser: result.modifiedCount > 0 ? req.body : null
            }
        );


    } catch (err) {
        res.status(err?.code ?? 400).send(err.message);
    }
});

module.exports = router;
