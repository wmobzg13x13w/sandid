// TodoService.js - Handles all localStorage operations for Todo items

const TODO_STORAGE_KEY = "todos_";

const TodoService = {
  // Get all todos from localStorage for a specific user
  getTodos: (userId) => {
    if (!userId) return [];
    const storageKey = TODO_STORAGE_KEY + userId;
    const savedTodos = localStorage.getItem(storageKey);
    return savedTodos ? JSON.parse(savedTodos) : [];
  },

  // Save todos to localStorage for a specific user
  saveTodos: (todos, userId) => {
    if (!userId) return;
    const storageKey = TODO_STORAGE_KEY + userId;
    localStorage.setItem(storageKey, JSON.stringify(todos));
  },

  // Add a new todo
  addTodo: (text, userId) => {
    if (!userId) return [];
    const todos = TodoService.getTodos(userId);
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    TodoService.saveTodos(updatedTodos, userId);
    return updatedTodos;
  },

  // Toggle todo completion status
  toggleTodo: (id, userId) => {
    if (!userId) return [];
    const todos = TodoService.getTodos(userId);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    TodoService.saveTodos(updatedTodos, userId);
    return updatedTodos;
  },

  // Update a todo's text
  updateTodo: (id, newText, userId) => {
    if (!userId) return [];
    const todos = TodoService.getTodos(userId);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    TodoService.saveTodos(updatedTodos, userId);
    return updatedTodos;
  },

  // Delete a todo
  deleteTodo: (id, userId) => {
    if (!userId) return [];
    const todos = TodoService.getTodos(userId);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    TodoService.saveTodos(updatedTodos, userId);
    return updatedTodos;
  },
};

export default TodoService;
