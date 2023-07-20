const db = require("../models");
const Member = db.members;
const jwt = require("jsonwebtoken")
const axios = require('axios');
const nodemailer = require('nodemailer');

//create
const addUser = async (req, res) => {


  let info = {
    member_name: req.body.name,
    password: req.body.password,
    member_email: req.body.email,
    tel: req.body.tel,
    birthday: req.body.birthday
  };
  console.log(info);
  
  try {
    const existingMember = await Member.findOne({ where: { member_email: req.body.email } });
  if (!existingMember) {
    await Member.create(info);
    res.send({code:200})

    
  } else {
    res.send({ code: 401, message: '이미 존재하는 이메일입니다.' });
  }

  } catch (error) {
    console.error('회원 가입 중 오류가 발생했습니다:', error);
    res.status(500).send({ code: 500, message: '회원 가입 중 오류가 발생했습니다.' });
  }
};


// --------------------------------------------------------------------------------------------------
//LogIn

const oneUser = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    try {
        const member = await Member.findOne({where: {member_email: email, password: password}}) // email 필드를 사용
        const accessToken = jwt.sign(
            {
                member_id: member.member_id, // 'member' 객체 사용
                member_state: Number(member.state)
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
        res.send({
            code: 400
        })
    }
};

/*
const naverCallback = async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;

    try {
        const result = await axios.post('https://nid.naver.com/oauth2.0/token', {
            grant_type: 'authorization_code',
            client_id: process.env.NAVER_APP_KEY,
            client_secret: process.env.NAVER_APP_SECRET,
            code,
            state
        });

        const { access_token } = result.data;
        // 이후 access_token을 사용하여 네이버 API를 호출하거나,
        // 사용자 로그인 및 회원가입 절차를 진행합니다.
        // ...

        // 네이버 API를 통해 이메일, 생년월일, 전화번호 정보 가져오기
        const userProfileResult = await axios.get('https://openapi.naver.com/v1/nid/me', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        const { email, birthday, mobile } = userProfileResult.data.response;
// 이메일, 생년월일, 전화번호를 사용하여 DB에서 회원 정보 확인 또는 생성
        const existingMember = await Member.findOne({ where: { member_email: email } });

        if (!existingMember) {
            // DB에 해당 정보가 없는 경우, 회원 추가
            const newMember = await Member.create({
                member_email: email,
                member_birthday: birthday,
                member_mobile: mobile
            });
            res.redirect(`/auth/success?email=${email}`);
        } else {
            // DB에 이메일 정보가 있는 경우, 로그인 처리
            res.redirect(`/auth/success?email=${email}`);
        }

    } catch (error) {
        console.error(error);
        res.redirect('/auth/failure');
    }
};
*/

// --------------------------------------------------------------------------------------------------

        const searchUser = async (req, res) => {                //아이디 찾기
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
                    res.status(401).send({ code:401, message: '입력하신 정보와 일치하는 이메일이 없습니다.'})
                }
            } catch (error) {
                console.error(error);
                res.status(500).send({ code: 500, message: "Internal Server Error" });
            }
        };  // <-- 여기서 함수가 끝납니다.

// ------------------------------------------------------------------------------------

                                                   //이메일 인증

const generateRandomCode = () => {                //이메일 코드 생성
  const code = Math.floor(100000 + Math.random() * 900000).toString().substring(0, 6);
  return code;
};

const sendEmail = async (req,res) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'yepproject9212@gmail.com', pass: 'gmmndxidvegxphtf' },
  });

  console.log( req.body.email )
  const verificationCode = generateRandomCode();
  console.log(verificationCode);

  const mailOptions = {
    from: 'YEP',
    to:  req.body.email,
    subject: '가입 인증 메일',
    html: `
      인증코드: <h2><strong>${verificationCode}</strong></h2><br/>
      <form action="#" method="POST">
      </form>  
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('이메일이 성공적으로 전송되었습니다.', info.messageId);
    res.send({ verificationCode }); // verificationCode를 응답으로 보내기
  } catch (error) {
    console.error('이메일 전송 중 오류가 발생했습니다:', error);
  }


};

 // ------------------------------------------------------------------------------------
 const findpwresult = async (req, res) => {                //비번 찾기(로그인창)
  let info = {
              member_name: req.body.member_name,
              member_email: req.body.email,
            };
          console.log(info)
  try {
    const member = await Member.findOne({
      // attributes: ["member_email"],
      where: {
        member_name: req.body.member_name,
        member_email: req.body.email,
      },
    });

    if (member) {
      res.status(200).send({ memberEmail: member.member_email });
    } else {
      res.status(401).send({ code: 401, message: "일치하는 계정이 없습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ code: 500, message: "내부 서버 오류" });
  }
};
 // ------------------------------------------------------------------------------------
                                                    //새로운 비번 변경
const updatePassword = async (req, res) => {
  try {

    const memberpw = await Member.update({password: req.body.newPassword }, {where:{ member_email: req.body.member_email}})

    // 비밀번호 업데이트가 성공적으로 수행되었다는 응답을 반환합니다.
    if (memberpw) {
      res.status(200).send({message: ''});
      console.log('비밀번호 업데이트 성공');
    }
  } catch (error) {
    console.error('비밀번호 업데이트 실패:', error);
    return res.status(500).send({code:500,  message: '비밀번호 업데이트 실패' });
  }
};
// ------------------------------------------------------------------------------------

// 네이버 로그인 라우트



module.exports = {
    addUser,
    oneUser,
    searchUser,
    sendEmail,
    findpwresult,
    updatePassword,
};

