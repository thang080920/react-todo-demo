import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../task-list/actions';
import './styles.css';

function CreateTask({data, addTask}) {

  const [addATask, setAddAtask] = useState({
    task_name: '', description: '', priority: 'normal',
  });
  function handleChange(e) {
    const value = e.target.value;
      setAddAtask({
        ...addATask,
        [e.target.name]: value,
      });
      // console.log(addATask);
  }

  function addNewTask(e) {
    e.preventDefault();
    if (addATask.task_name !== '' && addATask.description !== '' ) {
      addTask(addATask);
    }
    setAddAtask({
      ...addATask,
      task_name: '',
      description: '',
      priority: 'normal',
    })
  }

  return (
    <form className='col-md-12'>
      <div className='form-row'>
        <div className='col-md-3'>
          <input className='form-control' type="text" name="task_name" placeholder='please input the task name' value={addATask.task_name} onChange={handleChange}/>
        </div>
        <div className='col-md-3'>
          <input className='form-control' type="text" name="description" placeholder='Insert description' value={addATask.description} onChange={handleChange}/>
        </div>
        <div className='col-md-3'>
          <select className='form-control' name="priority" id="priority" value={addATask.priority} onChange={handleChange}>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className='col-md-3'>
          <button className='btn btn-info' type="submit" onClick={addNewTask}>Add Task</button>
        </div>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.taskList.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (newTask) => {
      dispatch(actions.addTask(newTask))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateTask);