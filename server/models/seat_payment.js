
// seat_payment.js
module.exports = (sequelize, DataTypes) => {
    const SeatPayment = sequelize.define('SeatPayment', {
        seat_payment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        seat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'seat_payment',
        timestamps: false,
    });

    SeatPayment.associate = function(models) {
        SeatPayment.belongsTo(models.Seat, {
            foreignKey: 'seat_id',
            onDelete: 'CASCADE',
            sourceKey: 'seat_id', // 추가: Seat 모델의 기본 키를 seat_id로 사용합니다.
        });
        SeatPayment.belongsTo(models.Payment, {
            foreignKey: 'payment_id',
            onDelete: 'CASCADE',
        });
    };

    return SeatPayment;

};