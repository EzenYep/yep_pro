const db = require("../models");
const Member = db.members;
const jwt = require("jsonwebtoken")

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
//LogIn
const oneUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    try {
        const member = await Member.findOne({where: {member_email: email, password: password}}) // email 필드를 사용
        const accessToken = jwt.sign(
            {
                member_id: member.member_id, // 'user' 객체 사용
            },
            `${process.env.JWT_KEY}`,  // 백틱 사용
            {expiresIn: 60 * 60 * 1000}
        )
        const refreshToken = jwt.sign(
            {
                member_id: member.member_id, // 'user' 객체 사용

            },
            `${process.env.JWT_KEY}`, // 백틱 사용
            {expiresIn: '1d'}
        )
        if(member){
            res.send({
                code: 200,
                accessToken: accessToken,
                refresh_token: refreshToken,
                member: member.member_id,// 'user' 객체 사용
                state: member.state
            })
        }else {
            res.send({
                code: 400
            })
        }


    } catch (e) {
        return console.log(e)
    }
};




module.exports = {
    addUser,
    oneUser
};