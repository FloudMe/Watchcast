import React, { Component } from "react";
import "./Background.css"
import axios from "axios";
import WatchCast from "../Component/WatchCast";
import Button from "../Component/Button";

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
        const userAll = {
            user: {
                email: this.state.email,
                password: this.state.password,
            },
            user_details: {
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                country: this.state.country,
            },
            
        }
        console.log(userAll);
        axios.post(`http://localhost:4000/users/register`, userAll)
            .then(res => {
                // const token = res.data;
                // console.log(token);
                alert("Udana rejestracja. Przeniesienie na stronę logowania");
                this.props.history.push('/login');
            })
            .catch(res =>{
                console.error(res);
                alert("Błąd z rejestracją. Powrót na stronę glówną");
                this.props.history.push('/');
            });

    }

    render() {
        return (
            <div id="SLIDE_BG">
                <WatchCast />
                <div className="loginRegister">
                    <form className="loginRegisterForm" onSubmit={this.handleSubmit}>
                        <input className="loginRegisterFormInput" type="text" name="email" id="email" placeholder="E-mail" onChange={this.handleChange} />
                        <input className="loginRegisterFormInput" type="password" name="password" id="password" placeholder="Hasło" onChange={this.handleChange} />
                        <input className="loginRegisterFormInput" type="password" name="passwordAgain" id="passwordAgain" placeholder="Powtórzyć hasło" onChange={this.handleChange} />
                        <input className="loginRegisterFormInput" type="text" name="firstName" id="firstName" placeholder="Imie" onChange={this.handleChange} />
                        <input className="loginRegisterFormInput" type="text" name="lastName" id="lastName" placeholder="Nazwisko" onChange={this.handleChange} />
                        <input className="loginRegisterFormInput" type="text" name="country" id="country" placeholder="Kraj" onChange={this.handleChange} />
                        <input className="loginRegisterSubmit" type="submit" value="Sign in" />
                    </form>
                    <div className="toLoginRegister">
                        <h2 className="toLR">Masz już konto? Zaloguj się!</h2>
                        <Button text='login' link='/login' />
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;