import React, { useState } from 'react';
import axios from 'axios';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted, setFilter, filter }) => {
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleDelete = async id => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    onTaskDeleted();
  };

  const startEdit = task => {
    setEditing(task._id);
    setEditForm(task);
  };

  const saveEdit = async () => {
    await axios.put(`http://localhost:5000/api/tasks/${editing}`, editForm);
    setEditing(null);
    onTaskUpdated();
  };

  const handleChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  return (
    <>
      <div className="d-flex gap-2 mb-3 justify-content-center w-50 align-items-center">
        <input className="form-control" placeholder="Filter by assignee" onChange={e => setFilter({ ...filter, assignedTo: e.target.value })} />
        <select className="form-control" onChange={e => setFilter({ ...filter, status: e.target.value })}>
          <option value="">All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="row">
        {tasks.map(task => (
          <div key={task._id} className="col-md-3 mb-4">
            <div className="card h-100">
              <div className="card-body">
                {editing === task._id ? (
                  <>
                    <input className="form-control mb-2" value={editForm.title} name="title" onChange={handleChange} />
                    <input className="form-control mb-2" value={editForm.assignedTo} name="assignedTo" onChange={handleChange} />
                    <select className="form-control mb-2" value={editForm.status} name="status" onChange={handleChange}>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                    <button className="btn btn-success btn-sm w-100" onClick={saveEdit}>Save</button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p><strong>Assigned To:</strong> {task.assignedTo}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-warning btn-sm" onClick={() => startEdit(task)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task._id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default TaskList;
