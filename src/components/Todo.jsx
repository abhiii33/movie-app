import React, { useState } from "react";

const Todo = () => {
  const [formData, setFormData] = useState({ name: "", email: "", status: "" });
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([ ...todos, formData]); // add new todo
    console.log("All Todos:", [...todos, formData]);  
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const deleteTodo = (index)=>{
     setTodos(prev => prev.filter((_,i)=>index !== i))
 }
  return (
    <div>
      <h1>Enter Todo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          type="text"
          onChange={handleChange}
          value={formData.name}
        />

        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
        />

        <label htmlFor="status">Status:</label>
        <input
          name="status"
          type="text"
          onChange={handleChange}
          value={formData.status}
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* Display added todos */}
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo, index) => (  
     <div> 
        <li key={index}>
            {todo.name} 
        </li>
        <button onClick={()=>{deleteTodo(index)}}>delete</button>
     </div>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
