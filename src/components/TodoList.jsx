import React from "react";
import TodoItem from "./TodoItem.jsx";

function TodoList({ todos, onToggle, onDelete, onEdit, filter }) {
  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // 'all' filter
  });

  return (
    <div className='todo-list'>
      {filteredTodos.length === 0 ? (
        <p className='empty-message'>No tasks to display</p>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
