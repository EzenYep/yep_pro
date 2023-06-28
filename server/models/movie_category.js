// movie_category.js
module.exports = (sequelize, DataTypes) => {
    const MovieCategory = sequelize.define('MovieCategory', {
        movie_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
    }, {
        tableName: 'movie_category',
        timestamps: false,
    });

    MovieCategory.associate = function(models) {
        MovieCategory.belongsTo(models.Movie, {
            foreignKey: 'movie_id',
            onDelete: 'CASCADE',
        });
        MovieCategory.belongsTo(models.Category, {
            foreignKey: 'category_id',
            onDelete: 'CASCADE',
        });
    };

    return MovieCategory;
};