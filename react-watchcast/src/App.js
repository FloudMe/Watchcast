import {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './index.css';
import Login from './Routes/Login'
import Register from './Routes/Register';
import Videos from './Routes/Videos';
import MainPage from './Routes/MainPage';
import UserDetails from "./Routes/UserDetails";
import About from './Routes/About';
import ChangeRole from "./Routes/ChangeRole";
import VideoPlayer from './Routes/VideoPlayer';

function App() {
    const [loggedUser, setLoggedUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    return (
        
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path='/' component={MainPage}>
                
              </Route>

              <Route
                         exact path="/login"
                         render={(props) => <Login {...props} setLoggedUser={setLoggedUser}/>}
                     >
              </Route>
              <Route exact path='/register' component={Register} >
 
              </Route>
              <Route exact path='/videos' component={Videos}>
                
              </Route>
              <Route exact path='/video/:id'
                     render={(props) => (
                      <VideoPlayer id={props.match.params.id}/>
                  )} >

              </Route>
              <Route exact path='/user-details' component={UserDetails}>
              </Route>
              <Route exact path='/change-role' component={ChangeRole}>

              </Route>
              <Route exact path='/about' component={About}>

              </Route>
            </Switch>
          </div>
        </BrowserRouter>


    );
}

export default App;
