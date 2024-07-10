import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Switch from 'react-switch';
import '../styles/Todo.css';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Fetch todos from backend
    axios.get('/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      axios.post('/api/todos', { title: newTodo })
        .then(response => {
          setTodos([...todos, response.data]);
          setNewTodo('');
        })
        .catch(error => console.error('Error adding todo:', error));
    }
  };

  const deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  const toggleComplete = (id) => {
    const todo = todos.find(todo => todo.id === id);
    axios.put(`/api/todos/${id}`, { ...todo, completed: !todo.completed })
      .then(response => setTodos(todos.map(todo => (todo.id === id ? response.data : todo))))
      .catch(error => console.error('Error toggling complete:', error));
  };

  return (
    <div className={`todo-app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="header">
        <div className="logo">
          <h1>TO DO APP</h1>
          <p>Stop Procrastinating, Start Organizing</p>
        </div>
        <div className="icons">
          <button className="theme-toggle">
            <Switch onChange={() => setDarkMode(!darkMode)} checked={darkMode} />
          </button>
        </div>
      </header>
      <div className="container">
        <h2>{todos.filter(todo => todo.completed).length} Completed</h2>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => toggleComplete(todo.id)} 
              />
              <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)}>
                <img src="/delete-icon.png" alt="Delete" />
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
          <input 
            type="text" 
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="New Note"
          />
          <button type="submit">Add New Note</button>
        </form>
      </div>
    </div>
  );
};

export default Todo;
