
// seat.js
module.exports = (sequelize, DataTypes) => {
    const Seat = sequelize.define('Seat', {
        seat_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        seat_number: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        seat_line: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        theater_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'seat',
        timestamps: false,
    });

    Seat.associate = function(models) {
        Seat.belongsTo(models.Theater, {
            foreignKey: 'theater_id',
            onDelete: 'CASCADE',
        });
        Seat.hasMany(models.SeatPayment, {
            foreignKey: 'seat_id',
            onDelete: 'CASCADE',
            sourceKey: 'seat_id', // 추가: SeatPayment 모델의 외래 키로 seat_id를 사용합니다.
        });
    };

    return Seat;
};