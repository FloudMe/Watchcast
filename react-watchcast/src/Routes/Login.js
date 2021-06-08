import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css"
import './Background.css';
import axios from "axios";
import WatchCast from "../Component/WatchCast";
// import Background from "../Component/Background";

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
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(`http://localhost:4000/users/login`, user)
            .then(res => {
                const data = res.data;
                if(data !== "Wrong password!" && data !== "User does not exist"){
                    // console.log('Im here');
                    // localStorage.setItem("user", JSON.stringify(data.token));
                    // localStorage.setItem("role", JSON.stringify(data.role));
                    // this.props.setLoggedUser(authentication.getCurrentUser());
                    alert("Zalogowałeś się. Powrót na stronę główną");
                } else {
                    throw Error("Zle hasło");
                }
            })
            .catch(res =>{
                console.error(res);
                alert("Błąd z zalogowaniem się. Powrót na stronę glówną");
            });
        event.preventDefault();
        this.props.history.push('/');
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
                        <Link to="/register">Załóż konto</Link>
                    </div>
                </div>
            </div>

        )
    }
}


export default Login;

