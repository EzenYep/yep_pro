const db = require("../models");
const Member = db.members;
//create
const addUser = async (req, res) => {
    let info = {
        member_name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        tel: req.body.tel,
        birthday: req.body.birthday
    };
    console.log(req.body)
    await Member.create(info).then(res.send({code: 200})).catch((err) => {
        res.send({code: 401})
        console.log(err)
    });
};

module.exports = {
    addUser,
};