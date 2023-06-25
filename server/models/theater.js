// theater.js
module.exports = (sequelize, DataTypes) => {
    const Theater = sequelize.define('Theater', {
        theater_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        theater_location: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        theater_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    }, {
        tableName: 'theater',
        timestamps: false,
    });

    Theater.associate = function(models) {
        Theater.hasMany(models.Screening, {
            foreignKey: 'theater_id',
            onDelete: 'CASCADE',
        });
        Theater.hasMany(models.Seat, {
            foreignKey: 'theater_id',
            onDelete: 'CASCADE',
        });
    };

    return Theater;
};
