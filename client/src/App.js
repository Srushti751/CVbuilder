import logo from './logo.svg';
import React,{Suspense,lazy} from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import Login from './components/Login';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import './App.css';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
// import Dashboard from './components/Dashboard';
import Editor from './components/Editor';
import ResumeEdit from './components/ResumeEdit';
const Dashboard = lazy(() => import('./components/Dashboard'))




function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>

          <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/login">
            <ChakraProvider>

              <Login />
            </ChakraProvider>

          </Route>

          <Route exact path="/signup">
            <ChakraProvider>

              <Signup />
            </ChakraProvider>

          </Route>
         

          <Route exact path="/home">
            <Suspense fallback={<div>Loading....</div>}>

              <Dashboard />
            </Suspense>

          </Route>
          <Route exact path="/editor">
            <Editor />
          </Route>

          <Route exact path="/updateResume/:rid" component={ResumeEdit} />


        </Switch>



      </Router>
    </div>
  );
}

export default App;
