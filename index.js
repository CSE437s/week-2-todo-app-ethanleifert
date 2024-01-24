const express = require('express'); //basic server setup
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


app.use(express.static('public'));

const fs = require('fs');

const DATA_FILE = 'public/data.json';

app.get('/todos', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post('/todos', (req, res) => {
  const newTodo = req.body;
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile(DATA_FILE, JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.json(todos);
    });
  });
});


app.post('/todos/delete', (req, res) => {
    const deleteTodo = req.body.task;
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            res.status(500).send('Error read');
            return;
        }
        let todos = JSON.parse(data);
        todos = todos.filter(todo => todo.task !== deleteTodo);

        fs.writeFile(DATA_FILE, JSON.stringify(todos), (err) => {
            if (err) {
                res.status(500).send('Error write');
                return;
            }
            res.json(todos);
        });
    });
});


//couldnt get this to work

// app.post('/delete-tasks', (req, res) => { 
//     fs.writeFile('../data.json', JSON.stringify([]), err => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('error');
//         }
//         res.send('All tasks deleted');
//     });
// });
