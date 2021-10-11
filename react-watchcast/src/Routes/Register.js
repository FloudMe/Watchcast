import axios from "axios";
import React, { Component } from "react";
import Button from "../Component/Button";
import WatchCast from "../Component/WatchCast";
import config from "../config";
import "./Background.css";
import "./LoginAndRegister.css";
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordAgain: '',
            firstName: '',
            lastName: '',
            country: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    handleSubmit(event) {
        event.preventDefault();
        if (this.checkIfNotNull()) {
            this.register();
        }
    }

    checkIfNotNull() {
        return this.state.email !== '' &&
            this.state.password !== '' &&
            this.state.passwordAgain !== '' &&
            this.state.firstName !== '' &&
            this.state.lastName !== '' &&
            this.state.country !== '';
    }

    register() {
        const userAll = this.getUser();

        axios.post(config.backendPath + `users/register`, userAll)
            .then(res => {
                alert("Udana rejestracja. Przeniesienie na stronę logowania");
                this.props.history.push('/login');
            })
            .catch(err => {
                alert(err.response.data.message);
            });
    }

    getUser() {
        return {
            user: {
                email: this.state.email,
                password: this.state.password,
            },
            user_details: {
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                country: this.state.country,
            },
        };
    }

    render() {
        return (
            <div id="SLIDE_BG">
                <WatchCast />
                <div className="register">
                    <form className="registerForm" onSubmit={this.handleSubmit}>
                        E-mail:<input className="registerFormInput"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="E-mail"
                            onChange={this.handleChange} />
                        Pasword:<input className="registerFormInput"
                            type="password" name="password"
                            id="password"
                            placeholder="Hasło"
                            onChange={this.handleChange} />
                        Confirm password:<input style={this.state.password !== this.state.passwordAgain ? { borderBottomColor: "red" } : {}}
                            className="registerFormInput"
                            type="password"
                            name="passwordAgain"
                            id="passwordAgain"
                            placeholder="Powtórzyć hasło"
                            onChange={this.handleChange} />
                        First name:<input className="registerFormInput"
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Imie"
                            onChange={this.handleChange} />
                        Last name:<input className="registerFormInput"
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Nazwisko"
                            onChange={this.handleChange} />
                        Country:<input className="registerFormInput"
                            type="text"
                            name="country"
                            id="country"
                            placeholder="Kraj"
                            onChange={this.handleChange} />
                        <input className="registerFormSubmit" type="submit" value="Sign in" />
                    </form>
                    <div className="toLogin">
                        <h2 className="toL">Masz już konto? Zaloguj się!</h2>
                        <Button text='login' link='/login' />
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;