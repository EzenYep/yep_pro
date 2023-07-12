// screening.js
module.exports = (sequelize, DataTypes) => {
    const Screening = sequelize.define('Screening', {
        screening_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        screening_date: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        screening_start_time: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        screening_end_time: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        theater_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'screening',
        timestamps: false,
    });

    Screening.associate = function(models) {
        Screening.belongsTo(models.Movie, {
            foreignKey: 'movie_id',
            onDelete: 'CASCADE',
        });
        Screening.belongsTo(models.Theater, {
            foreignKey: 'theater_id',
            onDelete: 'CASCADE',
        });
    };

    return Screening;
};