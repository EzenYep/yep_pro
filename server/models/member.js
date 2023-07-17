// member.js
module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define('Member', {
        member_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, // 올바른 옵션
            allowNull: false,
        },
        member_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        member_email: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        tel: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    }, {
        tableName: 'member',
        timestamps: false,
    });

    Member.associate = function(models) {
        Member.hasMany(models.Review, {
            foreignKey: 'member_id',
            onDelete: 'CASCADE',
        });
        Member.hasMany(models.Payment, {
            foreignKey: 'member_id',
            onDelete: 'CASCADE',
        });
        Member.hasMany(models.ReportComment, {
            foreignKey: 'member_id',
            onDelete: 'CASCADE',
        });
    };

    return Member;
};
