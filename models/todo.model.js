module.exports = (sequelize, Sequelize) => {
    const ToDo = sequelize.define("todo", {
        email: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return ToDo;
};
