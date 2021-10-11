import axios from "axios";
import React, { Component } from "react";
import Button from "../Component/Button";
import WatchCast from "../Component/WatchCast";
import config from "../config";
import authentication from "../scripts/authentication";
import './Background.css';
import "./btnAndForm.css";
import "./LoginAndRegister.css";

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
        if (this.fieldsIsNotEmpty()) {
            this.login();
        }
    }

    fieldsIsNotEmpty() {
        return this.state.email !== '' && this.state.password !== '';
    }

    login() {
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post(config.backendPath + `users/login`, user)
            .then(res => {
                const data = res.data;
                this.resLogin(data)
            })
            .catch(err => {
                alert(err.response.data.message);
            });
    }

    resLogin(data) {
        if (this.isDataRight(data)) {
            this.setItems(data);
        } else {
            throw Error("Zle hasło");
        }
    }

    isDataRight(data) {
        return data !== "Wrong password!" && data !== "User does not exist";
    }

    setItems(data) {
        localStorage.setItem("role", JSON.stringify(data.role));
        localStorage.setItem("user", JSON.stringify(data.token));

        this.props.setLoggedUser(authentication.currentUser());

        this.props.history.push('/videos');
    }

    render() {
        return (
            <div id="SLIDE_BG">
                <WatchCast />
                <div className="login">
                    <form className="loginForm" onSubmit={this.handleSubmit}>
                        E-mail:<input className="loginFormInput"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="E-mail"
                            onChange={this.handleChange} />
                        Password:<input className="loginFormInput"
                            type="password"
                            name="password"
                            id="password" placeholder="Hasło"
                            onChange={this.handleChange} />
                        <input className="loginFormSubmit" type="submit" value="Sign in" />
                    </form>
                    <div className="toRegister">
                        <h2 className="toR">Nie masz konta? Załóż dzisiaj!</h2>
                        <Button text='register' link='/register' />
                    </div>
                </div>
            </div>

        )
    }
}


export default Login;

