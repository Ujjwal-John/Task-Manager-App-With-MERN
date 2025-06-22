import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [form, setForm] = useState({ title: '', description: '', assignedTo: '', status: 'Pending' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('https://task-manager-app-with-mern.onrender.com/api/tasks', form);
    setForm({ title: '', description: '', assignedTo: '', status: 'Pending' });
    onTaskAdded();
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center mt-4'>
      <form onSubmit={handleSubmit} className="mb-4 w-50 w-100">
        <input name="title" className="form-control mb-2" placeholder="Title" value={form.title} onChange={handleChange} />
        <textarea name="description" className="form-control mb-2" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
        <input name="assignedTo" className="form-control mb-2" placeholder="Assigned To" value={form.assignedTo} onChange={handleChange} />
        <select name="status" className="form-control mb-2" value={form.status} onChange={handleChange}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button type="submit" className="btn btn-success">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
