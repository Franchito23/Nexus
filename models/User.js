import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import bycrypt from 'bcrypt';

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
}, {
    hooks:{
        beforeCreate: async function (user) {
            const salt = await bycrypt.genSalt(10);
            user.password = await bycrypt.hash(user.password, salt);
        }
    }
})

export default User