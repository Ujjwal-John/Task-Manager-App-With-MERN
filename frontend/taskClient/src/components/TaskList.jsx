import { useState } from 'react';
import axios from 'axios';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted,  }) => {
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleDelete = async id => {
    await axios.delete(`https://task-manager-app-with-mern.onrender.com/api/tasks/${id}`);
    onTaskDeleted();
  };

  const startEdit = task => {
    setEditing(task._id);
    setEditForm(task);
  };

  const saveEdit = async () => {
    await axios.put(`https://task-manager-app-with-mern.onrender.com/api/tasks/${editing}`, editForm);
    setEditing(null);
    onTaskUpdated();
  };

  const handleChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  return (
    <>
      

      <div className="row">
        {tasks.map(task => (
          <div key={task._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                {editing === task._id ? (
                  <>
                    <label htmlFor={`edit-title-${task._id}`}>Title</label>
                    <input
                      id={`edit-title-${task._id}`}
                      className="form-control mb-2"
                      value={editForm.title}
                      name="title"
                      onChange={handleChange}
                    />
                    <label htmlFor={`edit-assignedTo-${task._id}`}>Assigned To</label>
                    <input
                      id={`edit-assignedTo-${task._id}`}
                      className="form-control mb-2"
                      value={editForm.assignedTo}
                      name="assignedTo"
                      onChange={handleChange}
                    />
                    <label htmlFor={`edit-status-${task._id}`}>Status</label>
                    <select
                      id={`edit-status-${task._id}`}
                      className="form-control mb-2"
                      value={editForm.status}
                      name="status"
                      onChange={handleChange}
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                    <button className="btn btn-success btn-sm w-100 mt-auto" onClick={saveEdit}>Save</button>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <p><strong>Assigned To:</strong> {task.assignedTo}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <div className="d-flex justify-content-between mt-auto">
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
