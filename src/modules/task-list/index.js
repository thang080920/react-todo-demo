import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import CreateTask from '../create-task';
import 'bootstrap/dist/css/bootstrap.min.css'
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './styles.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TaskList({ data, deleteTask, editTask, deleteAllTask }) {

  const [edit, setEdit] = useState(
    { task_name: '', description: '' }
  );

  function handleChange(e) {
    const value = e.target.value;
      setEdit({
        ...edit,
        [e.target.name]: value,
      })
    // console.log(edit);
  }


  const [open, setOpen] = useState(
    {
      id: null,
      inputType: 'hidden',
    }
  );

  // const listItem = data.map((items, id) =>
  //   <tr key={id}>
  //     <td> {open.inputType === 'text' && open.id === id ? <input type={open.inputType} placeholder={items.task_name} value={edit.task_name} name='task_name' onChange={handleChange}/> :<span>{items.task_name}</span> } </td>
  //     <td> {open.inputType === 'text' && open.id === id ? <input type={open.inputType} placeholder={items.description} value={edit.description} name='description' onChange={handleChange} /> :<span>{items.description}</span>} </td>
  //     { open.inputType === 'text' && open.id === id ? 
  //       <td><button className='btn btn-success' onClick={ () => editATask(id) }>Save</button> <button className='btn btn-danger' onClick={ onOpenForm }>Cancel</button></td>
  //       : 
  //       <td><button className='col-lg-6 btn btn-info' onClick={ () => onOpenForm(id, items.task_name, items.description) }>Edit</button><button className='col-lg-6 btn btn-danger' onClick={() => deleteATask(id)}>Delete</button></td>
  //     }

  //   </tr>
  // );

  const listItem = data.map((items, id) =>
    <div onDoubleClick={open.inputType === 'hidden' ? () => onOpenForm(id, items.task_name, items.description) : () => editATask(id) } key={id} className={'items ' + items.priority}>
      {
      open.inputType === 'text' && open.id === id ?
      
      <form className='col-md-12 div'>
        <div className='col-md-8 text-field'>
            <label>Edit</label>
            <input className='form-control' type={open.inputType} value={edit.task_name} name='task_name' onChange={handleChange}/>
            <input className='form-control' type={open.inputType} value={edit.description} name='description' onChange={handleChange} />
        </div>
        <div className='col-md-4 button-field'>
          <a href="#" onClick={ onOpenForm }>Cancel</a>
          <p>Double-click to save</p>
        </div>
        </form>
      
      :
      <div className='col-md-12 div'>
        <div className='col-md-8 text-field'>
          <h2>{ items.task_name }</h2> 
          <p>{ items.description }</p>
        </div>

        <div className='col-md-4 button-field'>
          <a href="#" onClick={() => deleteATask(id)}>Delete</a>
          <p>Double-click to edit</p>
        </div>
      </div>

      }
      
    </div>
  );


  // function editATask() {
  //   const editedTask = {
  //     'task_name': 'Demo 4',
  //     'description': 'hahfiuhiawf',
  //   };
  //   const id = 2;
  // }
  function onDeleteAll() {
    var newData = [];

    deleteAllTask(newData);
  }


  function onOpenForm(id, task_name, description) {
    

    if (open.inputType === 'hidden') {
      setOpen({
        ...open,
        id: id,
        inputType: 'text',
      });
      setEdit({
        ...edit,
        task_name: task_name,
        description: description,
      });
    }
    
    else {
      setOpen({
        ...open,
        id: null,
        inputType: 'hidden',
      })
    }
    
    // console.log(open);
  }
  
  function editATask(id) {
    editTask(id, edit);
    onOpenForm();
    }

  function deleteATask(index) {
    const id = index;
    // console.log(id);
    deleteTask(id);
  }

  return (

    <div className='container'>
      <CreateTask />
        <button className='btn btn-danger btn-block col-lg-12' onClick={onDeleteAll}>Delete All</button>

      {/* <DragDropContext>
        <Droppable>
          <Draggable>
      <div classname='test high'>
        <span>test</span>
        <p>hfefkafhehakhkjd</p>
      </div>
          </Draggable>
        </Droppable>
      </DragDropContext> */}
      <div className='col-lg-12' style={{ paddingTop: '20px' }}>
        {listItem}
      </div>

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
    },

    deleteAllTask: (blank) => {
      dispatch(actions.deleteAllTask(blank))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskList);