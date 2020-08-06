import * as C from '../../app-constants';
import data from '../../data/data.json';

const initState = {
  loading: false,
  error: null,
  data: data,
};

export function ListAllTask(state = initState, action) {
  switch (action.type) {
    case C.ADD_TASK:
      return {
        ...state,
        data: [...state.data, action.newTask]
      };
    
    case C.EDIT_TASK:
      
      let editedData = [...state.data];
      editedData[action.id].task_name = action.editedTask.task_name;
      editedData[action.id].description = action.editedTask.description;

      return {
        ...state,
        data: editedData,
      }

    case C.DELETE_TASK:
      
      let newData = [...state.data];
      newData.splice(action.index, 1);
      return {
        ...state,
        data: newData,
      };

    case C.DELETE_ALL_TASK:
      return {
        ...state,
        data: action.blank,
      };
    // case C.TASKLIST_ERROR:
    //   return {
    //     ...state,
    //     error: action.error,
    //   };

    // case C.TASKLIST_SUCCESS:
    //   return {
    //     ...state,
    //     token: action.payload,
      default:
      return state;
    }
}