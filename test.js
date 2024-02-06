const test = async () => {
    try {
        await require("./db/db.connect").connect();
        const user = await require("./user/user.controller").readOne({
            _id: '65bf8010d28483802c3c14b5'
        });
        console.log(user);
    } catch (error) {
        console.log(error);
    }
};
test();


