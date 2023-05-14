module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                msg: 'This username is taken.',
            },
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: {
                msg: 'This email is taken.',
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return User;
};
