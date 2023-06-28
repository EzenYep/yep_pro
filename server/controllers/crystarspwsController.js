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

  module.exports = {
    crystarspws
  }