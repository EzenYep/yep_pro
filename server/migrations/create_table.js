'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Movie', {
            movie_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                comment: '고유식별자',
            },
            movie_title: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            movie_state: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: '0이면 상영 예정인 상태 1이면 상영중인 상태 2이면 상영 종료된 상태',
            },
            movie_description: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            age_rating: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            movie_views: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            director: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
        });

        await queryInterface.createTable('Category', {
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            category_name: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
        });

        await queryInterface.createTable('Theater', {
            theater_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: '고유식별자',
            },
            theater_location: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            theater_name: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
        });

        await queryInterface.createTable('Screening', {
            screening_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            screening_date: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            screening_start_time: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            screening_end_time: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            movie_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: '영화 외래키',
            },
            theater_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: '고유식별자',
            },
        });

        await queryInterface.createTable('Member', {
            member_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            member_name: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            member_email: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            state: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
                comment: '0이면 일반 유저 1이면 관리자 유저',
            },
            birthday: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            tel: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
        });

        await queryInterface.createTable('ScreeningPeriod', {
            period_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: '고유식별자',
            },
            start_date: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            end_date: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            movie_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: '영화 외래키',
            },
        });

        await queryInterface.createTable('ReportComment', {
            report_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: '고유식별자',
            },
            review_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: '평점 리뷰 외래키',
            },
            member_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: '외래키',
            },
        });

        await queryInterface.createTable('Payment', {
            payment_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            payment_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            amount: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            pay_state: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            screening_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            member_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        });

        await queryInterface.createTable('Seat', {
            seat_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            seat_number: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            seat_line: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            theater_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: '고유식별자',
            },
        });

        await queryInterface.createTable('File', {
            file_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: '고유식별자',
            },
            poster_url: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            trailer_url: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            movie_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: '영화 외래키',
            },
        });

        await queryInterface.createTable('Review', {
            review_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                comment: '고유식별자',
            },
            comment: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            starkit: {
                type: Sequelize.INTEGER,
                allowNull: true,
                comment: '평점은 int로 1-10까지 저장',
            },
            payment_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        });

        await queryInterface.createTable('Movie_category', {
            Movie_category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            movie_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: '영화 외래키',
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: '카테고리 외래키',
            },
        });

        await queryInterface.createTable('Seat_payment', {
            seat_payment_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            seat_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            payment_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Seat_payment');
        await queryInterface.dropTable('Movie_category');
        await queryInterface.dropTable('Review');
        await queryInterface.dropTable('File');
        await queryInterface.dropTable('Seat');
        await queryInterface.dropTable('Payment');
        await queryInterface.dropTable('ReportComment');
        await queryInterface.dropTable('ScreeningPeriod');
        await queryInterface.dropTable('Member');
        await queryInterface.dropTable('Screening');
        await queryInterface.dropTable('Theater');
        await queryInterface.dropTable('Category');
        await queryInterface.dropTable('Movie');
    },
};
