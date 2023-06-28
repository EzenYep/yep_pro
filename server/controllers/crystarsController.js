const db = require("../models");
const Member = db.members;

// 멤버의 이름 생년월일 전화번호 이메일 표시
const crystars = async (req, res) => {

    const crystar = await Member.findAll({
        attributes: ['member_name', 'member_birthday', 'member_tel', 'member_email'],
      });

    return res.send({crystar})
};

module.exports = {
    crystars
};