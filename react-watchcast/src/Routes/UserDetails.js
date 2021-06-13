import  { React,  Component } from "react";
import Navbar from "../Component/Navbar";
import ChangePass from "../Component/ChangePass";
import { Details } from "../Component/Details";
import axios from "axios";

class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state ={
            showUserDetails: false,
            showUserChangePass: false,
            email:'',
            name:'',
            lastName:'',
            country:''
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/users/bb39c8f9-7a15-4172-8264-4c956e741932`/* + uuid*/).then(res => {
                const user = res.data;

                console.log('Im in users');

                this.setState({email: user.email, name: user.first_name, lastName: user.last_name, country: user.country});
            });
        }

    render(){
        return(
            <div >
                <Navbar />
                <div className='details' >
                    <div className='user' onDoubleClick={() => this.setState({showUserDetails: !this.state.showUserDetails})}>
                    Użytkownik
                    </div>
                    {this.state.showUserDetails && <Details _email={this.state.email} _name={this.state.name} _lastName={this.state.lastName} _country={this.state.country} />}
                </div>
                <div className='changePass' >
                    <div className="pass" onDoubleClick={() => this.setState({showUserChangePass: !this.state.showUserChangePass})}>
                        Change Password
                    </div>
                    {this.state.showUserChangePass && <ChangePass />}
                </div>
            </div>
        )
    }
}

export default UserDetails;