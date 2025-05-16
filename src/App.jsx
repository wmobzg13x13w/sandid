import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoService from './services/TodoService';

function App() {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage using TodoService
    return TodoService.getTodos();
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  // Add a new todo
  const addTodo = () => {
    if (input.trim() !== '') {
      const updatedTodos = TodoService.addTodo(input.trim());
      setTodos(updatedTodos);
      setInput('');
    }
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    const updatedTodos = TodoService.toggleTodo(id);
    setTodos(updatedTodos);
  };

  // Edit a todo
  const editTodo = (id, newText) => {
    if (newText.trim() !== '') {
      const updatedTodos = TodoService.updateTodo(id, newText.trim());
      setTodos(updatedTodos);
    }
  };

  // Delete a todo
  const deleteTodo = (id) => {
    const updatedTodos = TodoService.deleteTodo(id);
    setTodos(updatedTodos);
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

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>
      
      <div className="filter-container">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
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
      
      <div className="todo-stats">
        <p>{todos.filter(todo => !todo.completed).length} tasks left</p>
      </div>
    </div>
  );
}

export default App;
