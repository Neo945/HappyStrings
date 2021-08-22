import './App.css';
// eslint-disable-next-line
import {Login} from './components';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { makeStyles } from '@material-ui/core';
import {Box} from '@material-ui/core'

function App() {
  makeStyles(theme => ({
    '@global': {
      '#root': {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#121212',
        color: theme.palette.text.primary,
      },
    },
  }))();
  return (
    <div>
    <Router>
      <Box height="64px"/>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>
    </Router>
    </div>
  )
}

export default App;
