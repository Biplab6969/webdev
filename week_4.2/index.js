//HTTP server Assignment-1 - try to code a todo app and store data into the array
const express = require("express");
const app = express();

app.use(express.json());
let todos = [];

//create a post request
app.post("/todos/create", (req, res) => {
  const { todo } = req.body;
  const id = parseInt(req.body.id);

  if(!id){
    return res.send("id cannot be empty")
  }
  for (let i=0; i<todos.length; i++){
    if(todos[i].id === id){
      return res.send("Todo already exist with id" + id);
    }
  }

  if (!todo || todo.trim() === ""){
    return res.send("Todo cannot be Empty");
  }

  const newTodo = {
    title: todo,
    id: id,
  };

  todos.push(newTodo);
  res.send("Todo added sucessfully");

  
});

//delete all todos
app.delete("/todos/delete/all", (req, res) => {
  todos= [];
  res.send("All todos deleted sucessfully");
});

//delete todo from id
app.delete("/todos/delete/:id", function (req, res) {
  const todoId = parseInt(req.body.id);
  let deleted = false;
  const tempTodos = [];
  for(let i = 0; i<todos.length; i++){
    if(todos[i].id === todoId){
      deleted = true;
      continue;
    }
    tempTodos.push(todos[i]);
  }
  if(!deleted){
    return res.send("Todo not found with id" + todoId);
  }
  todos = tempTodos;
  res.send("Todo delete sucessfully");
})

//update todo from id
app.put("/todo/update/:id", function(req, res){
  const { todo } = req.body;
  const todoId = parseInt(req.params.id);
  if (!todo || todo.trim() === ""){
    return res.send("todo cannot be empty");
  }
  let updated = false;
  for(let i=0; i<todos.length; i++){
    if(todo[i].id === todoId){
      todos[i].title = todo;
      updated = true;
    }
  }
  if(!updated){
    return res.send("Todo not found with id" + todoId);
  }
  res.send("Todo updated sucessfully with id" + todoId);
});

app.get("/todos/read/all", function (req, res) {
  // if no todos are found, send a response with message "No todos found"
  if (todos.length === 0) {
      return res.send("No todos found");
  }
  // send the todos array as response
  res.send(todos);
});

app.get("/todos/read/:id", function(req, res){
  const todoId = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === todoId);
  if (!todo) {
    return res.send("Todo not found with id " + todoId);
  }

// send the todo as response
    res.send(todo);
})

app.listen(3000, () => {
  console.log("server is run on port 3000");
  
})