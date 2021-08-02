import { Sequelize } from 'sequelize';
import { database, username, password } from '../config';

export const sequelize = new Sequelize(database, username, password, {
    dialect: 'mysql',
    host: 'localhost'
});