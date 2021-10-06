import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import About from "./Routes/About";
import ChangeRole from "./Routes/ChangeRole";
import Login from "./Routes/Login";
import MainPage from "./Routes/MainPage";
import Register from "./Routes/Register";
import UserDetails from "./Routes/UserDetails";
import VideoPlayer from "./Routes/VideoPlayer";
import Videos from "./Routes/Videos";
import authentication from "./scripts/authentication";

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setLoggedUser(authentication.getCurrentUser());
    setUserRole(authentication.getUserRole());
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainPage}></Route>

          <Route
            exact
            path="/login"
            render={(props) => (
              <Login {...props} setLoggedUser={setLoggedUser} />
            )}
          ></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/videos" component={Videos}></Route>
          <Route
            exact
            path="/video/:id"
            render={(props) => (
              <VideoPlayer
                {...props}
                id={props.match.params.id}
                loggedUser={loggedUser}
              />
            )}
          ></Route>
          <Route exact path="/user-details" component={UserDetails}></Route>
          <Route exact path="/change-role" component={ChangeRole}></Route>
          <Route exact path="/about" component={About}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
