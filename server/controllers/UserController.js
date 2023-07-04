const db = require("../models");
const Member = db.members;
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
//create
const addUser = async (req, res) => {
    let info = {
        member_name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        tel: req.body.tel,
        birthday: req.body.birthday
    };
    let tel = req.body.tel;
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
        console.log(member.member_email)
        if (member) {
            res.send({
                code: 200,
                accessToken: accessToken,
                refresh_token: refreshToken,
                email: member.member_email,
                state: member.state
            })
        } else {
            res.send({
                code: 400
            })
        }


    } catch (e) {
        return console.log(e)
    }
};

const crystarspwsok = async (req, res) => {
    console.log(req.body);

    const {password, confirmPasswordok} = req.body; // 새로 입력한 비밀번호와 확인용 비밀번호 입력

    let matched = false; // 일치 여부 저장 변수

    if (password === confirmPasswordok) {
        matched = true; // 비밀번호 일치
    }

    if (matched) {
        // 비밀번호 업데이트
        const member = await Member.findOne({where: {password}}); // 비밀번호와 일치하는 회원 찾기

        if (member) {
            member.password = password; // 새로운 비밀번호로 업데이트
            await member.save(); // 회원 정보 저장
        }
    }

    return res.send({matched});
};

// 비밀번호 변경
const crystarspws = async (req, res) => {
    console.log(req.body);

    const {password} = req.body; // 비밀번호 입력

    const member = await Member.findOne({where: {password}}); // 비밀번호와 일치하는 회원 찾기

    let matched = false; // 일치 여부 저장 변수

    if (member) {
        matched = true; // 비밀번호 일치
    }

    return res.send({matched});
};

const crystars = async (req, res) => {
    const email = req.body.email
    console.log(email)
    const crystar = await Member.findOne({
        where:{member_email:email},
        attributes: ['member_name', 'birthday', 'tel', 'member_email'],
    });

    if(crystar){
        res.send({
            code:200,
            member_name: crystar.member_name,
            member_birthday: crystar.birthday,
            member_tel : crystar.tel,
        })
    }else {
        res.send({code:400})
    }
};

const CrystalEvent = async () => {
    // ...
    await crystars(); // crystars 함수 호출
    // ...
};


//회원가입
const searchUser = async (req, res) => {
    let info = {
        member_name: req.body.member_name,
        tel: req.body.tel,
    };
    console.log(info)
    try {
        const member = await Member.findOne({
            attributes: ["member_email"],
            where: {
                member_name: req.body.member_name,
                tel: req.body.tel,
            },
        });

        if (member) {
            res.status(200).send({ memberEmail: member.member_email });
        } else {
            res.status(401)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};
// ------------------------------------------------------------------------------------

const sendEmail = async (req,res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: 'yepproject9212@gmail.com', pass: 'gmmndxidvegxphtf' },
    });
    console.log(req.body.email)
    const mailOptions = {
        from: 'YEP',
        to:  req.body.email,
        subject: '가입 인증 메일',
        html: `
      가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
    `,
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('이메일이 성공적으로 전송되었습니다.', info.messageId);
    } catch (error) {
        console.error('이메일 전송 중 오류가 발생했습니다:', error);
    }
};



module.exports = {
    addUser,
    oneUser,
    crystarspwsok,
    crystarspws,
    crystars,
    CrystalEvent,
    searchUser,
    sendEmail,
};

