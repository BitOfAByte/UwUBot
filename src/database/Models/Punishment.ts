const { DataTypes, Model } = require('sequelize');


export default class PunishmentModel extends Model {
    static init(sequelize) {
        return super.init({
            punishmentId: {
                type: DataTypes.NUMBER,
                autoIncrement: true,
                primaryKey: true
            },
            authorId: { type: DataTypes.STRING },
            userId: { type: DataTypes.STRING },
            reason: { type: DataTypes.STRING },
            guildId: { type: DataTypes.STRING },
        }, {
            tableName: 'Punishments',
            timestamps: true,
            sequelize
        });
    }
}