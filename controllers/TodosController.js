const Models = require('../models')
const { ToDo } = Models

const CreateTodo = async function (req, res) {
    try {
        const { email, username, description } = req.body

        console.log('[req.body]:', req.body)

        if (!email || !username || !description) {
            return res.send({
                message: "Fill all fields"
            })
        }

        const newTodo = {
            username: username, email: email, description: description
        }

        await ToDo.create(newTodo)
        res.send(newTodo)
    } catch (err) {
        res.send(err)
    }
}


const UpdateTodo = async function (req, res) {
    try {
        const { description, status } = req.body

        if (!description) {
            return res.send({
                message: "You need to fill description"
            })
        }

        const todo = await ToDo.update({
            description: description, status: status
        }, {
            where: {
                id: req.params.id
            }
        })

        res.send({
            message: "Updated"
        })

    } catch (err) {
        console.log(err)
    }
}


const DeleteTodo = async function (req, res) {
    try {
        await ToDo.destroy({
            where: {
                id: req.params.id
            }
        })

        res.send({
            message: "Deleted"
        })

    } catch (err) {
        console.log(err)
    }
}


const GetTodos = async function (req, res) {
    try {
        const todos = await ToDo.findAll({})
        res.send(todos)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    CreateTodo, UpdateTodo, DeleteTodo, GetTodos
}
