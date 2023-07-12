module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        category_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    }, {
        tableName: 'category',
        timestamps: false,
    });

    Category.associate = function(models) {
        Category.hasMany(models.Movie, {
            foreignKey: 'category_id',
            onDelete: 'CASCADE',
        });
    };

    return Category;
};