import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../task-list/actions';

function CreateTask({data, addTask}) {

  const [addATask, setAddAtask] = useState({task_name: "", description: ""});
  function handleChange(e) {
    const value = e.target.value;
    setAddAtask({
      ...addATask,
      [e.target.name]: value,
    });
  }

  function addNewTask(e) {
    e.preventDefault();
    addTask(addATask);
    setAddAtask({
      ...addATask,
      task_name: '',
      description: ''
    })
  }

  return (
    <div>
      <input type="text" name="task_name" placeholder='please input the task name' value={addATask.task_name} onChange={handleChange} />
      <input type="text" name="description"
      placeholder='Insert description' value={addATask.description} onChange={handleChange} />
      <button type="submit" onClick={addNewTask}>Add Task</button>
    </div>
  )
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (newTask) => {
      dispatch(actions.addTask(newTask))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateTask);