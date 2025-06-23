import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Taskfilter from './components/Taskfilter';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: '', assignedTo: '' });
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://task-manager-app-with-mern.onrender.com/api/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    const assignedToMatch = filter.assignedTo
      ? task.assignedTo.toLowerCase().includes(filter.assignedTo.toLowerCase())
      : true;

    const statusMatch = filter.status
      ? task.status === filter.status
      : true;

    return assignedToMatch && statusMatch;
  });

  return (
    <div style={{ background: "linear-gradient(to right, #3b82f6, #ec4899)", minHeight: "100vh" }}>
      <div className="container pt-4">
        <h2 className='text-center text-white'>Task Manager</h2>
        <TaskForm onTaskAdded={fetchTasks} />
        <Taskfilter setFilter={setFilter} filter={filter} />
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-white mt-2">Please wait data is Loading...</p>
          </div>
        ) : (
          <TaskList tasks={filteredTasks} onTaskUpdated={fetchTasks} onTaskDeleted={fetchTasks} />
        )}
      </div>
    </div>
  );
};

export default App;
