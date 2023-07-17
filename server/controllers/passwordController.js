const db = require("../models");
const Member = db.members;
const Payment = db.payments;

const axios = require('axios');

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword, email } = req.body;


  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: '새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.' });
    
  }

  try {
    // 이메일과 member_email 비교 등 필요한 로직 수행

    // 회원 조회
    const member = await Member.findOne({ where: { member_email: email } });

    if (!member) {
      return res.status(404).json({ message: '회원을 찾을 수 없음' });
    }

    // 현재 비밀번호 일치 여부 확인
    if (currentPassword !== member.password) {
      return res.status(400).json({ message: '현재 비밀번호가 일치하지 않음' });
    }

    // 비밀번호 업데이트 처리
    member.password = newPassword;
    await member.save();

    return res.status(200).json({ message: '비밀번호 업데이트 성공' });
  } catch (error) {
    console.error('비밀번호 업데이트 실패:', error);
    return res.status(500).json({ message: '비밀번호 업데이트 실패' });
  }
};

const deleteMember = async (req, res) => {
  const { memberEmail, currentPassword } = req.body;

  try {
    // 회원 조회
    const member = await Member.findOne({ where: { member_email: memberEmail } });

    if (!member) {
      console.error('회원을 찾을 수 없음');
      return res.status(404).json({ message: '회원을 찾을 수 없음' });
    }

    // 현재 비밀번호 일치 여부 확인
    if (currentPassword === member.password) {
      // 회원 삭제
      await member.destroy();

      console.log('회원 삭제 성공');
      return res.status(200).json({ message: '회원 삭제 성공' });
    } else {
      console.error('현재 비밀번호가 일치하지 않음');
      return res.status(400).json({ message: '현재 비밀번호가 일치하지 않습니다.' });
    }
  } catch (error) {
    console.error('회원 삭제 실패:', error);
    return res.status(500).json({ message: '회원 삭제 실패' });
  }
};


// 결제카운트
const getPaymentCount = async (req, res) => {
  try {
    const { member_email } = req.body;

    const query = `
      SELECT COUNT(*) AS count
      FROM Payment
      JOIN Member ON Payment.member_id = Member.member_id
      WHERE Member.member_email = :member_email
        AND Payment.pay_state = 1
    `;

    const [result] = await db.sequelize.query(query, {
      replacements: { member_email },
      type: db.sequelize.QueryTypes.SELECT
    });

    const count = result.count;

    res.json({ count });
  } catch (error) {
    console.error('결제 개수 조회 실패', error);
    res.status(500).json({ error: '결제 개수 조회 실패' });
  }
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
          birthday: crystar.birthday,
          tel : crystar.tel,
      })
  }else {
      res.send({code:400})
  }
};



module.exports = {
  updatePassword,
  deleteMember,
  getPaymentCount,
  crystars
};