const express = require('express')



const todosRouter = require('./routes/todos');

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/todos', todosRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app;