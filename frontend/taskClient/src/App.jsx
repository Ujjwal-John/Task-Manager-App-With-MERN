import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: '', assignedTo: '' });
  const [loading, setLoading] = useState(true); // ✅ Loading state

  const fetchTasks = async () => {
    setLoading(true); // ✅ Start loading
    try {
      const { status, assignedTo } = filter;
      const query = `?${status ? `status=${status}&` : ''}${assignedTo ? `assignedTo=${assignedTo}` : ''}`;
      const res = await axios.get(`https://task-manager-app-with-mern.onrender.com/api/tasks${query}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  return (
    <div style={{ background: "linear-gradient(to right, #3b82f6, #ec4899)", minHeight: "100vh" }}>
      <div className="container pt-4">
        <h2 className='text-center text-white'>Task Manager</h2>
        <TaskForm onTaskAdded={fetchTasks} />

        {/* ✅ Show loader or task list */}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-white mt-2">Please Wait Data is Loading...</p>
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
