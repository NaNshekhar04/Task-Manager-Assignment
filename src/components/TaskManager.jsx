import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../TaskManager.css';
const TaskManager = ({ user, onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    const handleAddTask = () => {
        if (!taskTitle.trim()) {
            alert('Please add the name of your task');
            return;
        }

        const newTask = {
            id: Date.now(),
            title: taskTitle,
            description: taskDescription,
            completed: false,
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTaskTitle('');
        setTaskDescription('');
    };

    const handleCompleteTask = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <div>
            <h2>Task Manager</h2>
            <button onClick={handleLogout}>Logout</button>
            <div>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        <div className="task-content">
                            <div>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                            </div>
                            <div className="task-buttons">
                                <button className="task-button" onClick={() => handleCompleteTask(task.id)}>
                                    {task.completed ? 'Undo' : 'Complete'}
                                </button>
                                <button className="task-button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManager;
