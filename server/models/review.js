// review.js
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        review_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: '고유식별자',
        },
        comment: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        starkit: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '평점은 int로 1-10까지 저장',
        },
        payment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'review',
        timestamps: false,
    });

    Review.associate = function(models) {
        Review.belongsTo(models.Payment, {
            foreignKey: 'payment_id',
            onDelete: 'CASCADE',
        });
    };

    return Review;
};
