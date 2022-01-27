const express = require('express')
var router = express.Router();

const todos =  [{id:1, name:'Do something', completed: false}];

router.get('/', (req, res) => {
    res.json(todos);
})

router.get('/:id', (req, res) => {
    const foundTodo = todos.find((todo) => todo.id === Number(req.params.id));
    if (!foundTodo){
        res.status(404).send();
    }
    else{
            res.json(foundTodo);
    }
})

router.post('/', (req, res) => {
    const {body} = req;

    if (typeof body.name !== 'string'){
        res.status(422).send();
    }

    const newTodo = {
        id: todos.length + 1,
        name: body.name,
        completed:false
    }

    todos.push(newTodo);

    res.status(201).json(newTodo);

})

module.exports = router;