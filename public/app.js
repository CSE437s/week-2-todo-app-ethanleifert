document.addEventListener('DOMContentLoaded', function() {
    fetchTodos(); //load existing to-do tasks
    document.getElementById('button').addEventListener('click', addToDo);
});

function addToDo() { //function for button to add items
    var task = document.getElementById("userItem").value;
    if(task.trim() !== ''){ //essentially, if the users input is not blank, then add it to the list of tasks below
        // var li = document.createElement("li");
        // li.textContent = task;
        // document.getElementById("listTasks").appendChild(li); //add item to tasklist
        addTodo({ task: task });
        addToDoItem(task);
        document.getElementById("userItem").value = ''; //reset and clear input
    }
}

function fetchTodos() { //api call for a get request for 'todos'
    fetch('/todos')
      .then(response => response.json())
      .then(todos => {
        console.log(todos); // Process and display todos
        todos.forEach(todo => {
            addToDoItem(todo.task);
        })
    });
}

function addToDoItem(task) {
    var li = document.createElement("li");
    li.textContent = task;
    document.getElementById("listTasks").appendChild(li); //add item to tasklist
    
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
        deleteTodo(task, li);
    };

    li.appendChild(deleteButton);
    document.getElementById("listTasks").appendChild(li);
}

  function addTodo(newTodo) { //again api call for post request to post the todo into json file
    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    })
      .then(response => response.json())
      .then(updatedTodos => {
        console.log(updatedTodos); // Update with new list of todos
      });
}

function deleteTodo(task, listItemElement) { //delete single item
    fetch('/todos/delete', { //delete todo from server
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: task })
    })
    .then(response => response.json())
    .then(() => {
        listItemElement.remove(); //remove from DOM so not on page
    })
    .catch(error => console.error('Error:', error));
}

//couldnt get this to work
// function deleteAllTasks() { //delete all tasks
//     fetch('/delete-tasks', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//     .then(response => response.text())
//     .then(data => {
//         console.log(data);
//         document.getElementById("taskList").innerHTML = '';
//     })
//     .catch(error => console.error('Error:', error));
// }

