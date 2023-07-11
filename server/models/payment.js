// payment.js
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        payment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        pay_state: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        screening_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        member_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'payment',
        timestamps: false,
    });

    Payment.associate = function(models) {
        Payment.belongsTo(models.Screening, {
            foreignKey: 'screening_id',
            onDelete: 'CASCADE',
        });
        Payment.belongsTo(models.Member, {
            foreignKey: 'member_id',
            onDelete: 'CASCADE',
        });
        Payment.hasMany(models.SeatPayment, {
            foreignKey: 'payment_id',
            onDelete: 'CASCADE',
        });
        Payment.hasOne(models.Review, {
            foreignKey: 'payment_id',
            onDelete: 'CASCADE',
        });
    };

    return Payment;
};
