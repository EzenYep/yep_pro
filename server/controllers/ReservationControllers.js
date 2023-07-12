const db = require("../models");

const Theater = db.theaters;
const Screening = db.screenings;
const Movie = db.movies;
const Seat = db.seats;
const User = db.members;

const {QueryTypes} = require("sequelize");
const sequelize = require("sequelize");





const theaterID = async (req, res) => {
    try {
       
        const thea = await Theater.findOne({ where: { theater_id: req.body.theaterId }, raw: true });

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
        const replacements = { theaterName: theaterName };


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
            where: { movie_id: req.body.movieId },
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
   const seata = await Theater.findOne ({
            where: { theater_name : req.body.theater_name}, raw: true
        });
        
        console.log(seata.theater_id)
        console.log(req.body)
        if (seata){ 
            const seatInfo = await Seat.findAll ({
                where: { theater_id: seata.theater_id }, raw: true
            
            });
            console.log(seatInfo);
            res.send(seatInfo);
        }
        

    } catch (error){
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
        `, {
            replacements: {
                movieId: movie.movie_id,
                theaterName: theater.theater_name,
                screeningTime: screening.screening_start_time
            },
            type: sequelize.QueryTypes.SELECT
        });
        console.log(reservedSeats)

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};


module.exports = {
    theaterID,
    titleID,
    screenTime,
    seatser,
    ReservedSeat
    // getScreenings
};