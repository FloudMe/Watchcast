import  { React,  Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar";
import ChangePass from "../Component/ChangePass";
import { Details } from "../Component/Details";

class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state ={
            showUserDetails: false,
            showUserChangePass: false
        }
        
    }

    render(){
        return(
            <div >
                <Navbar />
                <div className='details' >
                    <div className='user' onDoubleClick={() => this.setState({showUserDetails: !this.state.showUserDetails})}>
                    Użytkownik
                    </div>
                    {this.state.showUserDetails && <Details _email='a@gmail.com' _name='name' _lastName='lastname' _country='country' />}
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