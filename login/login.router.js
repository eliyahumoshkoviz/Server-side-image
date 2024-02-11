const express = require("express"),
    router = express.Router();

const { isUserExists } = require('./login.service')
router.post("/", async (req, res) => {
    try {
        res.send(
            { token: await isUserExists(req.body) }
        );
    } catch (err) {
        res.status(err?.code ?? 400).send(err.message);
    }
});

module.exports = router;