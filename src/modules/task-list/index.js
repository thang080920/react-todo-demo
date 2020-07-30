import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import CreateTask from '../create-task';

function TaskList({ data, deleteTask, editTask }) {

  const [edit, setEdit] = useState(
    { task_name: '', description: '' }
  );

  function handleChange(e) {
    const value = e.target.value;
    setEdit({
      ...edit,
      [e.target.name]: value,
    })
    console.log(edit);
  }

  const [open, setOpen] = useState(
    {
      id: null,
      inputType: 'hidden',
    }
  );

  const listItem = data.map((items, id) =>
    <tr key={id}>
      <td> {open.inputType === 'text' && open.id === id ? <input type={open.inputType} placeholder={items.task_name} value={edit.task_name} name='task_name' onChange={handleChange}/> :<span>{items.task_name}</span> } </td>
      <td> {open.inputType === 'text' && open.id === id ? <input type={open.inputType} placeholder={items.description} value={edit.description} name='description' onChange={handleChange} /> :<span>{items.description}</span>} </td>
      { open.inputType === 'text' && open.id === id ? 
        <td><button onClick={ () => editATask(id) }>Save</button><button onClick={ onOpenForm }>Cancel</button></td>
        : 
        <td><button onClick={ () => onOpenForm(id) }>Edit</button><button onClick={() => deleteATask(id)}>Delete</button></td>
      }

    </tr>
  );

  // function editATask() {
  //   const editedTask = {
  //     'task_name': 'Demo 4',
  //     'description': 'hahfiuhiawf',
  //   };
  //   const id = 2;
  // }
  
  function onOpenForm(id) {
    

    if (open.inputType === 'hidden') {
      setOpen({
        ...open,
        id: id,
        inputType: 'text',
      });
    }
    
    else {
      setOpen({
        ...open,
        id: null,
        inputType: 'hidden',
      })
    }
    
    console.log(open);
  }
  
  function editATask(id) {
    editTask(id, edit);
    onOpenForm();
    setEdit({
      ...edit,
      task_name: '',
      description: '',
    })
    }

  function deleteATask(index) {
    const id = index;
    // console.log(id);
    deleteTask(id);
  }

  return (

    <div>
      <CreateTask />
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listItem}
        </tbody>
      </table>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    data: state.taskList.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // task_list: (values, history, from) => {
    //   dispatch(actions.taskListAsync(values, history, from))
    // addTask: (newTask) => {
    //   dispatch(actions.addTask(newTask))
    // }
    deleteTask: (id) => {
      dispatch(actions.deleteTask(id))
    },

    editTask: (id, editedTask) => {
      dispatch(actions.editTask(id, editedTask))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskList);