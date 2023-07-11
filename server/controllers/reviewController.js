const db = require("../models");
const Payment = db.payments;
const Member = db.members;
const Screening = db.screenings;
const Review = db.reviews;
const Movie = db.movies;
const ReportComment = db.reportcomments;
const {QueryTypes} = require("sequelize");
const sequelize = require("sequelize");

const commentCreate = async (req, res) => {
    const email = req.body.user;
    const movie_id = req.body.id;

    try {
        // 멤버 테이블에서 이메일을 기준으로 멤버 아이디를 조회합니다.
        const member = await Member.findOne({
            where: {member_email: email},
            raw: true
        });

        if (member) {
            const memberId = member.member_id;

            // 상영 테이블에서 영화의 아이디로 조회합니다.
            const screening = await Screening.findOne({
                where: {movie_id: movie_id},
                raw: true
            });

            // 결제 테이블에서 상영 ID와 멤버 ID가 모두 일치하는 데이터를 조회합니다.
            const payment = await Payment.findOne({
                where: {
                    screening_id: screening.screening_id,
                    member_id: memberId
                },
                raw: true
            });

            if (payment) {
                // 리뷰를 생성하는 로직을 작성합니다.
                const reviewData = {
                    created_at: new Date(), // Set the created_at field to the current date and time
                    starkit: req.body.starkit,
                    comment: req.body.comment,
                    payment_id: payment.payment_id
                };
                // Review 모델의 create 메서드를 사용하여 리뷰를 생성합니다.
                const createdReview = await Review.create(reviewData);

                if (createdReview) {
                    res.send({code: 200});
                } else {
                    res.send({code: 400});
                }
            } else {
                return res.status(404).json({error: '결제 정보를 찾을 수 없습니다.'});
            }
        } else {
            return res.status(404).json({error: '멤버를 찾을 수 없습니다.'});
        }
    } catch (error) {
        console.error('리뷰 생성 중에 오류가 발생했습니다:', error);
        res.status(500).json({error: '리뷰 생성 중에 오류가 발생했습니다.'});
    }
};

const comment_info = async (req, res) => {
    try {
        const query = `
            SELECT r.*, p.*, s.*, m.*, mb.member_name
            FROM review r
                     JOIN payment p ON r.payment_id = p.payment_id
                     JOIN screening s ON p.screening_id = s.screening_id
                     JOIN movie m ON s.movie_id = m.movie_id
                     JOIN member mb ON p.member_id = mb.member_id
            WHERE m.movie_id = :movieId
        `;
        const movieId = req.body.id
        const reviews = await db.sequelize.query(query, {
            replacements: {movieId},
            type: QueryTypes.SELECT,
            raw: true
        });
        console.log(reviews)
        res.json(reviews)
    } catch (error) {
        console.error('Error retrieving movie reviews:', error);
        throw error;
    }
};

const report_comment = async (req, res) => {
    try {
        const email = req.body.email;
        const review_id = req.body.review_id;
        const members = await Member.findOne({where: {member_email: email}, raw: true})
        const reportData = {
            review_id: review_id,
            member_id: members.member_id,
            reporttime: new Date(), // Set the created_at field to the current date and time
        };
        console.log(reportData)
        if (members) {
            const createdReport = await ReportComment.create(reportData)
            if (createdReport) {
                res.send({code: 200});
            } else {
                res.send({code: 400});
            }
        }
    } catch (e) {
        console.error(e)
    }

}


module.exports = {
    commentCreate, comment_info, report_comment
}