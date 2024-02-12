const express = require("express"),
    router = express.Router();

const userService = require("./user.service");
const { authenticate, checkPermission } = require("../middleware/autu");

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
        let result = await userService.GetUserInfo({ email: req.body.email });
        res.send(
            {
                deletedUser: result
            }
        );
    } catch (err) {
        res.status(err?.code ?? 400).send(err.message);
    }
});

router.patch("/", authenticate, checkPermission, async (req, res) => {
    try {
        const email = req.body.auth.permission === "user" ? req.body.auth.email : req.body.email;
        const result = await userService.GetUserInfo({ email: email });
        const updated = await userService.updateFieldById(result._id, req.body.data);

        res.send(
            {
                success: updated.modifiedCount > 0,
                message: updated.modifiedCount > 0 ? "User updated successfully." : "User not updated",
                deletedUser: updated.modifiedCount > 0 ? await userService.GetUserInfo({ email: req.body.email }) : null
            }
        );
    } catch (err) {
        res.status(err?.code ?? 400).send(err.message);
    }
});


router.delete("/", authenticate, checkPermission, async (req, res) => {
    try {

        let user = await userService.GetUserInfo({ email: req.body.email });
        let result = await userService.del(req.body);
        user.isActive = false;

        res.status(result.modifiedCount > 0 ? 200 : 400).send(
            {
                success: result.modifiedCount > 0,
                message: result.modifiedCount > 0 ? "User deleted successfully." : "User not found",
                deletedUser: result.modifiedCount > 0 ? user : null
            }
        );


    } catch (err) {
        res.status(err?.code ?? 400).send(err.message);
    }
});

module.exports = router;
