import React from 'react';
import TaskList from './modules/task-list';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path='/' component={TaskList}/>
    </Router>
  );
}

export default App;
