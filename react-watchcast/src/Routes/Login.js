import axios from "axios";
import React, { Component } from "react";
import Button from "../Component/Button";
import WatchCast from "../Component/WatchCast";
import config from "../config";
import authentication from "../scripts/authentication";
import './Background.css';
import "./Login.css";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    handleSubmit(event) {
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(config.backendPath + `users/login`, user)
            .then(res => {
                const data = res.data;
                if (data !== "Wrong password!" && data !== "User does not exist") {

                    localStorage.setItem("role", JSON.stringify(data.role));
                    localStorage.setItem("user", JSON.stringify(data.token));

                    this.props.setLoggedUser(authentication.currentUser());
                    // userHasAuthenticated(true);

                    this.props.history.push('/videos');
                } else {
                    throw Error("Zle hasło");
                }
            })
            .catch(res => {
                console.error(res);
                alert("Błąd z zalogowaniem się.");
            });
    }

    render() {
        return (
            <div id="SLIDE_BG">
                <WatchCast />
                <div className="loginRegister">
                    <form className="loginRegisterForm" onSubmit={this.handleSubmit}>
                        {/* <h2>Zaloguj się!</h2> */}
                        <input className="loginRegisterFormInput" type="text" name="email" id="email" placeholder="E-mail" onChange={this.handleChange} />
                        <input className="loginRegisterFormInput" type="password" name="password" id="password" placeholder="Hasło" onChange={this.handleChange} />
                        <input className="loginRegisterSubmit" type="submit" value="Sign in" />
                    </form>
                    <div className="toLoginRegister">
                        <h2 className="toLR">Nie masz konta? Załóż dzisiaj!</h2>
                        {/* <Link to="/register">Załóż konto</Link> */}
                        <Button text='register' link='/register' />
                    </div>
                </div>
            </div>

        )
    }
}


export default Login;

