import axios from "axios";
import React, { Component } from "react";
import Form from "../Component/Form";
import Navbar from "../Component/Navbar";
import UserForChange from "../Component/UserForChange";
import config from "../config";
import authentication from "../scripts/authentication";

class ChangeRole extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            userId: '',
            adminId: '',
            users: [],
            admins: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitUser = this.handleSubmitUser.bind(this);
        this.handleSubmitAdmin = this.handleSubmitAdmin.bind(this);
        this.axiosPut = this.axiosPut.bind(this);
    }

    componentDidMount(){
        if(authentication.userRole() === "admin"){
            axios.get(config.backendPath + `users/allUsers`, {headers: { 'authorization': authentication.authenticationHeader() }})
                .then(res => {
                    const usersRes = res.data.users;
                    const adminsRes = res.data.admins;
                    
                    this.setState({userId: usersRes[0].uuid});
                    this.setState({adminId: adminsRes[0].uuid});
                    
                    this.setState({users: usersRes});
                    this.setState({admins: adminsRes});
                })
        }else{
            window.location.href = "/videos";
        }
    }

    handleChange = ( { target } ) => {
        const uuid = target.value;

        (target.className === "users") ? this.setState({userId: uuid}) : this.setState({adminId: uuid});
    };

    handleSubmitUser(event) {
        this.axiosPut(this.state.userId, event);
    }

    handleSubmitAdmin(event) {
        this.axiosPut(this.state.adminId, event);
        
    }

    axiosPut(uuid, event){
        axios.put(config.backendPath + `users/changeRole`, {"user": uuid }, {headers: { 'authorization': authentication.authenticationHeader() }});
        event.preventDefault();
    }

    render() {
        return (
            <div >
                <Navbar />
                <div className='changeRole'>
                    <Form 
                        classNameSelect='users'
                        classNameInput='userRoleSubmit'
                        onSubmit={this.handleSubmitUser}
                        value={this.state.userId}
                        onChange={this.handleChange}
                        data={this.state.users}
                    />

                    <Form 
                        classNameSelect='admins'
                        classNameInput='adminRoleSubmit'
                        onSubmit={this.handleSubmitAdmin}
                        value={this.state.adminId}
                        onChange={this.handleChange}
                        data={this.state.admins}
                    />
                </div>
            </div>
        )
    }
}

export default ChangeRole;