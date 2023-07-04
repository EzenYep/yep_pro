// file.js
module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
        file_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        poster_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        trailer_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'file',
        timestamps: false,
    });

    File.associate = function(models) {
        File.belongsTo(models.Movie, {
            foreignKey: 'movie_id',
            onDelete: 'CASCADE',
        });
    };

    return File;
};