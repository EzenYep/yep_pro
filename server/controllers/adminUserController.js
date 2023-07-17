const db = require('../models');
const Member = db.members;

const getUserList = async (req, res) => {
  try {
    const userList = await Member.findAll();
    res.status(200).json({ userList });
  } catch (error) {
    console.error('회원 목록을 가져오는데 실패했습니다.', error);
    res.status(500).json({ message: '회원 목록을 가져오는데 실패했습니다.' });
  }
};

const deleteUsers = async (req, res) => {
  const { values } = req.body;

  try {
    // 회원 삭제
    await Member.destroy({ where: { member_id: values } });

    console.log('회원 삭제 성공');
    return res.status(200).json({ message: '회원 삭제 성공' });
  } catch (error) {
    console.error('회원 삭제 실패:', error);
    return res.status(500).json({ message: '회원 삭제 실패' });
  }
};

module.exports = {
  getUserList,
  deleteUsers
};