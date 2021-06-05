import {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './index.css';
import Login from './Routes/Login'
import Register from './Routes/Register';
import Videos from './Routes/Videos';

function App() {
    const [loggedUser, setLoggedUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    return (
        
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path='/'>
                
              </Route>
              
              <Route
                         exact path="/login"
                         render={(props) => <Login {...props} setLoggedUser={setLoggedUser}/>}
                     >
              </Route>
              <Route exact path='/register' component={Register}>

              </Route>
              <Route exact path='/videos/' component={Videos}>
                
              </Route>
            </Switch>
          </div>
        </BrowserRouter>


    );
}

export default App;
