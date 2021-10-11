import axios from "axios";
import { Component, React } from "react";
import Button from "../Component/Button";
import ChangePass from "../Component/ChangePass";
import { Details } from "../Component/Details";
import Navbar from "../Component/Navbar";
import config from "../config";
import authentication from "../scripts/authentication";
import './LoginAndRegister.css';
import './UserDetails.css';

class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserDetails: false,
            showUserChangePass: false,
            email: '',
            name: '',
            lastName: '',
            country: ''
        }
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        axios.get(config.backendPath + `users/`,
            { headers: { 'Authorization': authentication.authenticationHeader() } })
            .then(res => {
                const user = res.data;
                if (user === "Brak tokena")
                    return this.props.history.push("/");

                this.setState({ email: user.email, name: user.first_name, lastName: user.last_name, country: user.country });
            })
            .catch(err => {
                alert(err.response.data.message)
            })
    }

    deleteUser() {
        axios.delete(config.backendPath + 'users/',
            { headers: { 'Authorization': authentication.authenticationHeader() } })
            .then(res => {
                alert("User successfully deleted")
                authentication.logout()
                window.location.href = '/'

            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }

    render() {
        return (
            <div className="background">
                <Navbar />
                <div className='userDetails'>
                    <div className='details' >
                        <div className='user' onClick={() => this.setState({ showUserDetails: !this.state.showUserDetails })}>
                            Użytkownik
                        </div>
                        {this.state.showUserDetails &&
                            <Details _email={this.state.email} _name={this.state.name} _lastName={this.state.lastName} _country={this.state.country} />}
                    </div>

                    <div className='changePass' >
                        <div className="pass" onClick={() => this.setState({ showUserChangePass: !this.state.showUserChangePass })}>
                            Change Password
                        </div>
                        {this.state.showUserChangePass && <ChangePass />}
                    </div>
                    <div className='deleteButtonUser' onClick={() => this.deleteUser()}>
                        <Button text='Delete user' />
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDetails;