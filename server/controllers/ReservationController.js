const db = require("../models");

const Theater = db.theaters;
const Screening = db.screenings;
const Movie = db.movies;
const Seat = db.seats;
const Member = db.members;
const SeatPayment = db.seat_payments;
const Payment = db.payments
const {QueryTypes, where} = require("sequelize");
const sequelize = require("sequelize");
const Iamport = require("iamport");
const axios = require("axios");


const theaterID = async (req, res) => {
    try {

        const thea = await Theater.findAll({where: {theater_location: req.body.theaterLocation}, raw: true});

        res.send(thea);
    } catch (error) {
        // 오류 처리
    }
};

const titleID = async (req, res) => {
    try {

        const theaterName = req.body.theaterName;


        const query = `
            SELECT t.theater_id, t.theater_location, t.theater_name, m.movie_id, m.movie_title
            FROM theater AS t
                     LEFT JOIN screening AS s ON t.theater_id = s.theater_id
                     LEFT JOIN movie AS m ON s.movie_id = m.movie_id
            WHERE t.theater_name = :theaterName
        `;
        const replacements = {theaterName: theaterName};


        const movieList = await db.sequelize.query(query, {
            replacements,
            type: sequelize.QueryTypes.SELECT
        });


        res.send(movieList);


    } catch (error) {
        // 오류 처리
    }
};


const screenTime = async (req, res) => {
    try {

        const screens = await Screening.findAll({
            where: {movie_id: req.body.movieId},
            // screen_time만 조회하도록 attributes 설정
            raw: true
        });


        res.send(screens);
    } catch (error) {
        // 오류 처리
    }
};

const seatser = async (req, res) => {
    try {
        const seata = await Theater.findOne({
            where: {theater_name: req.body.theater_name}, raw: true
        });

        if (seata) {
            const seatInfo = await Seat.findAll({
                where: {theater_id: seata.theater_id}, raw: true

            });
            console.log(seatInfo);
            res.send(seatInfo);
        }


    } catch (error) {
        console.log(error);

    }
}
const ReservedSeat = async (req, res) => {
    try {
        const movieId = req.body.movie_id;
        const theaterName = req.body.theater_name;
        const screeningTime = req.body.screening_time;

        const movie = await Movie.findOne({
            where: {movie_title: movieId}, raw: true
        });
        const theater = await Theater.findOne({
            where: {theater_name: theaterName}, raw: true
        });
        const screening = await Screening.findOne({
            where: {screening_start_time: screeningTime}, raw: true
        });
        const reservedSeats = await db.sequelize.query(`
            SELECT seat.*
            FROM seat
                     JOIN seat_payment ON seat.seat_id = seat_payment.seat_id
                     JOIN payment ON seat_payment.payment_id = payment.payment_id
                     JOIN screening ON payment.screening_id = screening.screening_id
                     JOIN theater ON screening.theater_id = theater.theater_id
            WHERE screening.movie_id = :movieId
              AND theater.theater_name = :theaterName
              AND screening.screening_start_time = :screeningTime
              AND payment.pay_state = 1
        `, {
            replacements: {
                movieId: movie.movie_id,
                theaterName: theater.theater_name,
                screeningTime: screening.screening_start_time
            },
            type: sequelize.QueryTypes.SELECT
        });
        console.log(reservedSeats)
        res.send(reservedSeats)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
const makeReservation = async (req, res) => {
    try {
        const { movie_id, theater_name, screening_time, seat_ids, member_id } = req.body;
        const member = await Member.findOne({
            where:{member_email: member_id}
        })
        if (!member) {
            return res.status(400).send({ message: "로그인 해주세요." });
        }
        const movie = await Movie.findOne({
            where:{movie_title: movie_id}
        })
        if (!movie) {
            return res.status(400).send({ message: "해당하는 상영 정보를 찾을 수 없습니다." });
        }
        const movie_price = movie.price;
        const movieId = movie.movie_id;

        const theater = await Theater.findOne({
            where:{theater_name: theater_name}
        })
        const theater_id = theater.theater_id;
        // screening_id를 찾기 위해 Screening 테이블을 조회합니다.
        const screening = await Screening.findOne({
            where: { movie_id:movieId, theater_id : theater_id,  screening_start_time:screening_time }
        });
        if (!screening) {
            return res.status(400).send({ message: "해당하는 상영 정보를 찾을 수 없습니다." });
        }
        const screening_id = screening.screening_id;
        // Payment 테이블에 새로운 엔트리를 생성합니다.
        const newPayment = await Payment.create({
            payment_date: new Date(),
            amount: seat_ids.length * movie_price,
            pay_state: 1, // 결제 상태는 성공으로 가정
            screening_id,
            member_id: member.member_id,
        });

        // 각 좌석에 대해 SeatPayment 테이블에 새로운 엔트리를 생성합니다.
        for (const seat_id of seat_ids) {
            await SeatPayment.create({
                seat_id,
                payment_id: newPayment.payment_id
            });
        }
        res.status(200).send({ message: "예약 성공" });
    } catch (error) {
        console.error("예약 중에 오류가 발생했습니다:", error);
        res.status(500).send({ message: "서버 오류" });
    }
};
const paylog = async (req,res) =>{
    try{
        console.log(req.body.movie_id)
        const moviePay = await Movie.findOne({where:{movie_title:req.body.movie_id},raw:true})
        console.log(moviePay)
        if(moviePay){
            const mpay = moviePay.price;
            const member_id = await Member.findOne({where:{member_email:req.body.member_email}})
            if(member_id){
                const payLog = await Payment.findAll({where:{member_id:member_id.member_id}})
                if(!payLog){
                    res.send({code:200,amount:mpay*0.8})
                }else {
                    res.send({code:300,amount:mpay})
                }
            }
        }

    }catch (error) {
        console.log(error)
    }
}

module.exports = {
    theaterID,
    titleID,
    screenTime,
    seatser,
    ReservedSeat,
    makeReservation,
    paylog
};