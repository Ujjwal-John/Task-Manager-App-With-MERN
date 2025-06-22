import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: '', assignedTo: '' });

  const fetchTasks = async () => {
    const { status, assignedTo } = filter;
    const query = `?${status ? `status=${status}&` : ''}${assignedTo ? `assignedTo=${assignedTo}` : ''}`;
    const res = await axios.get(`https://task-manager-app-with-mern.onrender.com/api/tasks${query}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  return (
    <div  style={{ background: "linear-gradient(to right, #3b82f6, #ec4899)" , minHeight: "100vh" }}>
      <div className="container pt-4" >
        <h2 className='text-center'>Task Manager</h2>
        <TaskForm onTaskAdded={fetchTasks} />
        <TaskList
          tasks={tasks} 
          onTaskUpdated={fetchTasks}
          onTaskDeleted={fetchTasks}
          setFilter={setFilter}
          filter={filter}
        />
      </div>

    </div>
    
  );
};

export default App;
