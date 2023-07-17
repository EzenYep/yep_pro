
// screening_period.js
module.exports = (sequelize, DataTypes) => {
    const ScreeningPeriod = sequelize.define('ScreeningPeriod', {
        period_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'screening_period',
        timestamps: false,
    });

    ScreeningPeriod.associate = function(models) {
        ScreeningPeriod.belongsTo(models.Movie, {
            foreignKey: 'movie_id',
            onDelete: 'CASCADE',
        });
    };

    return ScreeningPeriod;

};