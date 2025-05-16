import { useState, useEffect } from "react";
import TodoService from "./services/TodoService";
import AuthService from "./services/AuthService";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // Load todos for this user
      setTodos(TodoService.getTodos(currentUser.id));
    }
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (input.trim() !== "" && user) {
      const updatedTodos = TodoService.addTodo(input.trim(), user.id);
      setTodos(updatedTodos);
      setInput("");
    }
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    if (user) {
      const updatedTodos = TodoService.toggleTodo(id, user.id);
      setTodos(updatedTodos);
    }
  };

  // Edit a todo
  const editTodo = (id, newText) => {
    if (newText.trim() !== "" && user) {
      const updatedTodos = TodoService.updateTodo(id, newText.trim(), user.id);
      setTodos(updatedTodos);
    }
  };

  // Delete a todo
  const deleteTodo = (id) => {
    if (user) {
      const updatedTodos = TodoService.deleteTodo(id, user.id);
      setTodos(updatedTodos);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  // Handle user login
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setTodos(TodoService.getTodos(loggedInUser.id));
  };

  // Handle user logout
  const handleLogout = () => {
    AuthService.logoutUser();
    setUser(null);
    setTodos([]);
  };

  return (
    <div className='app-container'>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <div className='app-header'>
            <h1>Todo List</h1>
            <div className='user-info'>
              <span>Welcome, {user.username}</span>
              <button onClick={handleLogout} className='logout-button'>
                Logout
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='todo-form'>
            <input
              type='text'
              value={input}
              onChange={handleInputChange}
              placeholder='Add a new task...'
            />
            <button type='submit'>Add</button>
          </form>

          <div className='filter-container'>
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}>
              All
            </button>
            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}>
              Active
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}>
              Completed
            </button>
          </div>

          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            filter={filter}
          />

          <div className='todo-stats'>
            <p>{todos.filter((todo) => !todo.completed).length} tasks left</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
