// TodoService.js - Handles all localStorage operations for Todo items

const TODO_STORAGE_KEY = "todos";

const TodoService = {
  // Get all todos from localStorage
  getTodos: () => {
    const savedTodos = localStorage.getItem(TODO_STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  },

  // Save todos to localStorage
  saveTodos: (todos) => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  },

  // Add a new todo
  addTodo: (text) => {
    const todos = TodoService.getTodos();
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    TodoService.saveTodos(updatedTodos);
    return updatedTodos;
  },

  // Toggle todo completion status
  toggleTodo: (id) => {
    const todos = TodoService.getTodos();
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    TodoService.saveTodos(updatedTodos);
    return updatedTodos;
  },

  // Update a todo's text
  updateTodo: (id, newText) => {
    const todos = TodoService.getTodos();
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    TodoService.saveTodos(updatedTodos);
    return updatedTodos;
  },

  // Delete a todo
  deleteTodo: (id) => {
    const todos = TodoService.getTodos();
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    TodoService.saveTodos(updatedTodos);
    return updatedTodos;
  },
};

export default TodoService;
