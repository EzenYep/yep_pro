const db = require("../models");
const { QueryTypes } = require("sequelize");
const sequelize = db.sequelize;
const Member = db.members;
const Payment = db.payments;
const Review = db.reviews;


// 리뷰정보불러오기
const getReviewList = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const query = `
      SELECT m.movie_title, r.*
      FROM review r
      JOIN payment p ON r.payment_id = p.payment_id
      JOIN screening s ON p.screening_id = s.screening_id
      JOIN movie m ON s.movie_id = m.movie_id
      JOIN member mb ON p.member_id = mb.member_id
      WHERE mb.member_email = :email
    `;
    const reviews = await db.sequelize.query(query, {
      replacements: { email },
      type: QueryTypes.SELECT,
      raw: true
    });

    // Modify the response format
    const reviewList = reviews.map(review => ({
      movie_title: review.movie_title,
      starkit: review.starkit,
      comment: review.comment,
      review_id: review.review_id
    }));

    res.json(reviewList);
  } catch (error) {
    console.error('Error retrieving movie reviews:', error);
    res.status(500).json({ error: '영화 리뷰를 가져오는데 실패하였습니다.' });
  }
};



//리뷰삭제

const deleteComment = async (req, res) => {
  const { reviewIds, email } = req.body;

  try {
    const deleteQuery = `
      DELETE r
      FROM Review AS r
      JOIN Payment AS p ON r.payment_id = p.payment_id
      JOIN Screening AS s ON p.screening_id = s.screening_id
      JOIN Movie AS m ON s.movie_id = m.movie_id
      JOIN Member AS mb ON p.member_id = mb.member_id
      WHERE mb.member_email = :email
        AND r.review_id IN (:reviewIds);
    `;

    await db.sequelize.query(deleteQuery, {
      replacements: { reviewIds, email },
      type: db.sequelize.QueryTypes.DELETE
    });

    console.log('리뷰 삭제 성공');
    return res.status(200).json({ message: '리뷰 삭제 성공' });
  } catch (error) {
    console.error('리뷰 삭제 실패:', error);
    return res.status(500).json({ message: '리뷰 삭제 실패' });
  }
};



// 예매상태



const getReservationStatus = async (req, res) => {
  try {
    const { email } = req.body;
    const query = `
    SELECT
      m.movie_title,
      t.theater_name,
      s.screening_start_time,
      st.seat_number,
      p.pay_state,
      p.payment_id
    FROM
      Movie m
        JOIN Screening s ON m.movie_id = s.movie_id
        JOIN Theater t ON s.theater_id = t.theater_id
        JOIN Seat st ON t.theater_id = st.theater_id
        JOIN Seat_payment sp ON st.seat_id = sp.seat_id
        JOIN Payment p ON sp.payment_id = p.payment_id
        JOIN Member mb ON p.member_id = mb.member_id
    WHERE mb.member_email = :email
    ORDER BY p.payment_id DESC
  `;
    const reservations = await db.sequelize.query(query, {
      replacements: { email },
      type: QueryTypes.SELECT,
      raw: true
    });

    // Modify the response format
    const reservationList = reservations.map(reservation => ({
      movie_title: reservation.movie_title,
      theater_name: reservation.theater_name,
      screening_start_time: reservation.screening_start_time,
      seat_number: reservation.seat_number,
      pay_state: reservation.pay_state,
      payment_id: reservation.payment_id
    }));

    res.json(reservationList);
  } catch (error) {
    console.error('Error retrieving movie reviews:', error);
    res.status(500).json({ error: '영화 리뷰를 가져오는데 실패하였습니다.' });
  }
};

// 예매취소 버전 1

// const cancelReservations = async (req, res) => {
//   const { reservations } = req.body;

//   try {
//     // 데이터베이스 업데이트
//     await Payment.update(
//       { pay_state: 0 }, // 변경할 필드와 값
//       { where: { member_id: reservations } } // 업데이트할 예매 정보의 조건
//     );

//     console.log('예매 취소 성공');
//     return res.status(200).json({ message: '예매 취소 성공' });
//   } catch (error) {
//     console.error('예매 취소 실패:', error);
//     return res.status(500).json({ message: '예매 취소 실패' });
//   }
// };


// 예매취소 버전 2

const cancelReservations = async (req, res) => {
  const { selectedReservations } = req.body;
  console.log(selectedReservations)
  try {
    await Payment.update(
        { pay_state: 0 },
        { where: { payment_id: selectedReservations } }
    );

    console.log('예매 취소 성공');
    return res.status(200).json({ message: '예매 취소 성공' });
  } catch (error) {
    console.error('예매 취소 실패:', error);
    return res.status(500).json({ message: '예매 취소 실패' });
  }
};

const getRecentMovie = async (req, res) => {
  try {
    const RecentMovie = await db.sequelize.query(
        'SELECT f.poster_url '+
        'FROM `payment` p '+
        'JOIN `member` m ON p.member_id = m.member_id '+
        'JOIN `screening` s ON p.screening_id = s.screening_id '+
        'JOIN `movie` mo ON s.movie_id = mo.movie_id '+
        'JOIN `file` f ON mo.movie_id = f.movie_id '+
        'WHERE m.member_email = :email '+
        'ORDER BY p.payment_date DESC',
        {
          type: QueryTypes.SELECT,
          replacements: {
            email: req.body.email
          },
        }
    );
    console.log(RecentMovie);
    res.status(200).json({ posters: RecentMovie }); // 포스터 데이터를 클라이언트로 전달
  } catch (error) {
    console.error("Error loading recent movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//수정

const updateComment = async (req, res) => {
  try {
    // 수정할 필드와 값을 요청에서 가져옵니다.
    const { starkit, comment, review_id } = req.body;

    // 데이터베이스에서 해당 리뷰를 조회합니다.
    const review = await Review.findOne({ where: { review_id: req.body.review_id } }); // review_id를 기준으로 리뷰를 조회하도록 수정

    if (!review) {
      return res.status(404).json({ error: '리뷰를 찾을 수 없습니다.' });
    } else {
      // 필드를 수정합니다.
      review.comment = comment;
      review.starkit = starkit;
      review.review_id = review_id;

      // 수정된 리뷰 정보를 저장합니다.
      await review.save();

      return res.status(200).json({ message: '리뷰 정보가 수정되었습니다.' });
    }
  } catch (error) {
    console.error('리뷰 정보 수정 실패:', error);
    return res.status(500).json({ error: '서버 오류' });
  }
};




module.exports = {
  getReviewList,
  deleteComment,
  getReservationStatus,
  cancelReservations,
  getRecentMovie,
  updateComment
};
