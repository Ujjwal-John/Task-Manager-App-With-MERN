import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: '', assignedTo: '' });
  const [loading, setLoading] = useState(true); // 🆕 loading state

  const fetchTasks = async () => {
    setLoading(true); // start loading
    try {
      const { status, assignedTo } = filter;
      const query = `?${status ? `status=${status}&` : ''}${assignedTo ? `assignedTo=${assignedTo}` : ''}`;
      const res = await axios.get(`http://localhost:5000/api/tasks${query}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  return (
    <div style={{ background: "linear-gradient(to right, #3b82f6, #ec4899)", minHeight: "100vh" }}>
      <div className="container pt-4">
        <h2 className="text-center">Task Manager</h2>
        <TaskForm onTaskAdded={fetchTasks} />
        
        {/* 👇 Conditional rendering based on loading state */}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-white mt-2">Fetching tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onTaskUpdated={fetchTasks}
            onTaskDeleted={fetchTasks}
            setFilter={setFilter}
            filter={filter}
          />
        )}
      </div>
    </div>
  );
};

export default App;
