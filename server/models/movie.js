
// movie.js
module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
        movie_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        movie_title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        movie_state: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        movie_description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        age_rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        director: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    }, {
        tableName: 'movie',
        timestamps: false,
    });

    Movie.associate = function(models) {
        Movie.hasMany(models.Screening, {
            foreignKey: 'movie_id',
            onDelete: 'CASCADE',
        });
        Movie.hasOne(models.File, {
            foreignKey: 'movie_id',
            as: 'file',
            onDelete: 'CASCADE',
        });
        Movie.belongsToMany(models.Category, {
            through: 'MovieCategory',
            foreignKey: 'movie_id',
        });
        Movie.hasMany(models.Review, {
            foreignKey: 'movie_id',
            onDelete: 'CASCADE',
        });
    };

    return Movie;
};

