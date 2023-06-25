'use strict';
const { Sequelize, DataTypes } = require("sequelize");
const env = process.env.NODE_ENV || "development";

const config = require("../config/config.json")[env];

const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


sequelize
    .sync({ force: false })
    .then(() => {
      console.log("데이터베이스 연결됨.");
    })
    .catch((err) => {
      console.error(err);
    });

const Member = require("./Member.js")(sequelize, DataTypes);
const Category = require("./category.js")(sequelize,DataTypes);
const File = require("./file.js")(sequelize,DataTypes);
const Movie = require("./movie")(sequelize,DataTypes);
const MovieCategory = require("./movie_category")(sequelize,DataTypes);
const Payment = require("./payment")(sequelize,DataTypes);
const ReportComment = require("./reportcomment")(sequelize,DataTypes);
const Screening = require("./screening")(sequelize,DataTypes);
const ScreeningPeriod = require("./payment")(sequelize,DataTypes);
const Seat = require("./seat")(sequelize,DataTypes);
const SeatPayment = require("./seat_payment")(sequelize,DataTypes);
const Theater = require("./theater")(sequelize,DataTypes);

db.members = Member;
db.categorys = Category;
db.files = File;
db.movies = Movie;
db.movie_categorus = MovieCategory;
db.payments = Payment;
db.reportcomments = ReportComment;
db.screenings = Screening;
db.screening_periods = ScreeningPeriod;
db.seats = Seat;
db.seat_payments = SeatPayment;
db.theaters = Theater;

module.exports = db;
