const Todo = require('../model/Todo');

exports.getTodos = async (req, res) => {
    try {
        let { page, id, limit } = req.query;

        limit = limit ? limit : 10;
        page = page ? page : 1;

        limit = parseInt(limit);
        page = parseInt(page);

        let todos;
        if(!id){
            todos = await Todo.find({}).skip((limit * page) - limit).limit(limit);
        } else {
            todos = await Todo.findById(id);
        }

        if(!todos || todos.length < 1){
            return res.json({ msg: "Todo not found"})
        }
        res.json({ msg: "All Todos", todos})
    } catch (error) {
        return res.status(500).json({ msg: 'Server Error' })
    }
}

// exports.getTodo = async (req, res) => {
//     try {
//         const todo = await Todo.findById(req.params.id);
//         if(!todo || todo.length < 1){
//             return res.json({ msg: "Todo not found"})
//         }
//         res.json({ msg: "Your Todo", todo })
//     } catch (error) {
//         return res.status(500).json({ msg: 'Server Error' })
//     }
// }

exports.createTodo = async (req, res) => {
    try {
        const todo = req.body.name;
        if(todo === undefined || todo.trim() === ''){
            return res.json({ msg: "Please enter valid input" })
        }
        const newTodo = new Todo({
            name: todo
        });
        await newTodo.save();
        res.status(201).json({ msg: "Todo Created" })
    } catch (error) {
        return res.status(500).json({ msg: 'Server Error' })
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo){
            return res.json({ msg: "Todo not found for updation"})
        }

        todo.name = req.body.name;
        await todo.save();
        res.status(200).json({ msg: "Todo Updated" })
    } catch (error) {
        return res.status(500).json({ msg: 'Server Error' })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo){
            return res.json({ msg: "Todo not found for deletion"})
        }

        await todo.remove();
        res.status(200).json({ msg: "Todo Deleted" })
    } catch (error) {
        return res.status(500).json({ msg: 'Server Error' })
    }
}