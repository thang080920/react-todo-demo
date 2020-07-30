import * as C from '../../app-constants';

export function deleteTask(index) {
  return {
    type: C.DELETE_TASK,
    index,
  }
}

export function addTask(newTask) {
  return {
    type: C.ADD_TASK,
    newTask,
  }
}

export function editTask(id, editedTask) {
  return {
    type: C.EDIT_TASK,
    id,
    editedTask,
  }
}

// function taskListError(error) {
//   return {
//     type: C.TASKLIST_ERROR,
//     error,
//   }
// }

// function taskListSuccess(payload) {
//   return {
//     type: C.TASKLIST_SUCCESS,
//     payload,
//   }
// }

// export function taskListAsync(values, history, from) {
//   return async (dispatch) => {
//     dispatch(taskList());
//     try {
//       dispatch(taskListSuccess());
//     } catch (err) {
//       dispatch(taskListError());
//     }
//   }
// }