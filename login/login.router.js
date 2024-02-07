const express = require("express"),
    router = express.Router();
const { createToken } = require("../middleware/autu")

router.post("/", async (req, res) => {
    try {
        let x = {
            name: "koko"
        }
        let token = createToken(x)
        res.send(
            {
                token,
            }

        );
    } catch (err) {
        res.status(err?.code ?? 400).send(err.message);
    }
});

module.exports = router;