const db = require("../models");
const Payment = db.payments;
const Member = db.members;
const Screening = db.screenings;
const Review = db.reviews;
const commentCreate = async (req, res) => {
    const email = req.body.user;
    const movie_id = req.body.id;

    try {
        // 멤버 테이블에서 이메일을 기준으로 멤버 아이디를 조회합니다.
        const member = await Member.findOne({
            where: { member_email: email },
            raw: true
        });

        if (member) {
            const memberId = member.member_id;

            // 상영 테이블에서 영화의 아이디로 조회합니다.
            const screening = await Screening.findOne({
                where: { movie_id: movie_id },
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
                // ...
                await Review.create()
            }else {
                return res.status(404).json({ error: '결제 정보를 찾을 수 없습니다.' });
            }

            res.status(200).json({ success: true });
        } else {
            return res.status(404).json({ error: '멤버를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('리뷰 생성 중에 오류가 발생했습니다:', error);
        res.status(500).json({ error: '리뷰 생성 중에 오류가 발생했습니다.' });
    }
};


module.exports = {
    commentCreate,
}