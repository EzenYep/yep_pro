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

  module.exports = {
    crystarspwsok,
};