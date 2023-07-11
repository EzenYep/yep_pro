const db = require('../models');
const Member = db.members;
const Review = db.reviews;

const getReportDetails = async (req, res) => {
  try {
    const query = `
      SELECT
          rc.report_id,
          rc.reporttime,
          r.comment,
          r.review_id, 
          m1.member_email AS reporter_email,
          m2.member_email AS payment_member_email
      FROM
          reportcomment AS rc
      INNER JOIN
          review AS r ON r.review_id = rc.review_id
      INNER JOIN
          member AS m1 ON m1.member_id = rc.member_id
      INNER JOIN
          payment AS p ON p.payment_id = r.payment_id
      INNER JOIN
          member AS m2 ON m2.member_id = p.member_id;
    `;

    const result = await db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Failed to fetch report data:', error);
    res.status(500).json({ message: 'Failed to fetch report data' });
  }
};

const deleteReportUsers = async (req, res) => {
  const values  = req.body.values;
  console.log(values)

  try {
    // 회원 삭제
    await Member.destroy({ where: { member_email: values } });

    console.log('회원 삭제 성공');
    return res.status(200).json({ message: '회원 삭제 성공' });
  } catch (error) {
    console.error('회원 삭제 실패:', error);
    return res.status(500).json({ message: '회원 삭제 실패' });
  }
};

const deleteComment = async(req, res) => {
  const reviewIds = req.body.reviewIds;

  try {
    await Review.destroy({ where: { review_id : reviewIds } });

    console.log('게시글 삭제 성공');
    return res.status(200).json({ message: '게시글 삭제 성공' });
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    return res.status(500).json({ message: '게시글 삭제 실패' });
  }
}


  module.exports = {
    getReportDetails,
    deleteReportUsers,
    deleteComment 
  };