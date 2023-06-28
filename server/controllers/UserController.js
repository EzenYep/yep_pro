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

const crystarspwsok = async (req, res) => {
    console.log(req.body);
  
    const { password, confirmPasswordok } = req.body; // 새로 입력한 비밀번호와 확인용 비밀번호 입력
  
    let matched = false; // 일치 여부 저장 변수
  
    if (password === confirmPasswordok) {
      matched = true; // 비밀번호 일치
    }
  
    if (matched) {
      // 비밀번호 업데이트
      const member = await Member.findOne({ where: { password } }); // 비밀번호와 일치하는 회원 찾기
  
      if (member) {
        member.password = password; // 새로운 비밀번호로 업데이트
        await member.save(); // 회원 정보 저장
      }
    }
  
    return res.send({ matched });
  };

  // 비밀번호 변경
const crystarspws = async (req, res) => {
    console.log(req.body);
  
    const { password } = req.body; // 비밀번호 입력
  
    const member = await Member.findOne({ where: { password } }); // 비밀번호와 일치하는 회원 찾기
  
    let matched = false; // 일치 여부 저장 변수
  
    if (member) {
      matched = true; // 비밀번호 일치
    }
  
    return res.send({ matched });
  };

  const crystars = async (req, res) => {

    const crystar = await Member.findAll({
        attributes: ['member_name', 'member_birthday', 'member_tel', 'member_email'],
      });

    return res.send({crystar})
};

const CrystalEvent = async () => {
    // ...
    await crystars(); // crystars 함수 호출
    // ...
  };


module.exports = {
    addUser,
    crystarspwsok,
    crystarspws,
    crystars,
    CrystalEvent
};