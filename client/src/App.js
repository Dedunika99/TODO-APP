import React, { Component } from "react";
import { Paper, TextField, Checkbox, Button } from '@mui/material';
import "./App.css";

class App extends Component {
  state = {
    tasks: [], // List of tasks
    currentTask: "", // Current input value
  };

  // Handle input changes
  handleChange = (e) => {
    this.setState({ currentTask: e.target.value });
  };

  // Handle form submission
  handleSubmit = (e) => {
    e.preventDefault();
    const { tasks, currentTask } = this.state;

    if (currentTask.trim() === "") return;

    const newTask = {
      _id: Date.now(), // Temporary unique ID
      task: currentTask,
      completed: false,
    };

    this.setState({
      tasks: [...tasks, newTask],
      currentTask: "", // Clear input after adding task
    });
  };

  // Handle task completion toggle
  handleUpdate = (taskId) => {
    const tasks = this.state.tasks.map((task) =>
      task._id === taskId
        ? { ...task, completed: !task.completed }
        : task
    );
    this.setState({ tasks });
  };

  // Handle task deletion
  handleDelete = (taskId) => {
    const tasks = this.state.tasks.filter((task) => task._id !== taskId);
    this.setState({ tasks });
  };

  render() {
    const { tasks, currentTask } = this.state;

    return (
      <div className="App flex">
        <Paper elevation={3} className="container">
          <div className="heading">TO-DO</div>

          {/* Form for adding new tasks */}
          <form
            onSubmit={this.handleSubmit}
            className="flex"
            style={{ margin: "15px 0" }}
          >
            <TextField
              variant="outlined"
              size="small"
              style={{ width: "80%" }}
              value={currentTask}
              required
              onChange={this.handleChange}
              placeholder="Add New TO-DO"
            />
            <Button
              style={{ height: "40px", marginLeft: "10px" }}
              color="primary"
              variant="outlined"
              type="submit"
            >
              Add Task
            </Button>
          </form>

          {/* Task list */}
          <div>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Paper key={task._id} className="flex task_container">
                  <Checkbox
                    checked={task.completed}
                    onClick={() => this.handleUpdate(task._id)}
                    color="primary"
                  />
                  <div
                    className={task.completed ? "task line_through" : "task"}
                  >
                    {task.task}
                  </div>
                  <Button
                    onClick={() => this.handleDelete(task._id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </Paper>
              ))
            ) : (
              <p>No tasks available. Add one!</p>
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

export default App;
