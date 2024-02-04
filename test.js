const test = async () => {
    try {
        await require("./db/db.connect").connect();
        const user = await require("./user/user.controller").readOne({
            email: "jogna.doe@example.com",
        });
        console.log(user);
    } catch (error) {
        console.log(error);
    }
};
test();
