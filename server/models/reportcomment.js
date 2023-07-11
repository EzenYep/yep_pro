// reportcomment.js
module.exports = (sequelize, DataTypes) => {
    const ReportComment = sequelize.define('ReportComment', {
        report_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        review_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        member_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'reportcomment',
        timestamps: false,
    });

    ReportComment.associate = function(models) {
        ReportComment.belongsTo(models.Review, {
            foreignKey: 'review_id',
            onDelete: 'CASCADE',
        });
        ReportComment.belongsTo(models.Member, {
            foreignKey: 'member_id',
            onDelete: 'CASCADE',
        });
    };

    return ReportComment;
};
