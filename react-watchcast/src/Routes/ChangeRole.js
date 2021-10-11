import axios from "axios";
import React, { Component } from "react";
import Form from "../Component/Form";
import Navbar from "../Component/Navbar";
import config from "../config";
import authentication from "../scripts/authentication";
import './ChangeRole.css'

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
        // this.axiosPut = this.axiosPut.bind(this);
    }

    componentDidMount() {
        if (this.roleIsAdmin()) {
            axios.get(config.backendPath + `users/allUsers`,
                { headers: { 'authorization': authentication.authenticationHeader() } })
                .then(res => {
                    this.setDataStates(res);
                })
                .catch(res => {
                    alert("Błąd pobrania userów");
                })
        } else {
            window.location.href = "/videos";
        }
    }

    handleChange = ({ target }) => {
        const uuid = target.value;

        (target.className === "usersSelect") ?
            this.setState({ userId: uuid }) : this.setState({ adminId: uuid });
    };

    roleIsAdmin() {
        return authentication.userRole() === "admin";
    }

    setDataStates(res) {
        const usersRes = res.data.users;
        const adminsRes = res.data.admins;

        this.setState({ userId: usersRes[0].uuid });
        this.setState({ adminId: adminsRes[0].uuid });

        this.setState({ users: usersRes });
        this.setState({ admins: adminsRes });
    }


    handleSubmitUser(event) {
        this.axiosPut(this.state.userId, event);
    }

    handleSubmitAdmin(event) {
        this.axiosPut(this.state.adminId, event);

    }

    axiosPut(uuid, event) {
        axios.put(config.backendPath + `users/changeRole`,
            { "user": uuid },
            { headers: { 'authorization': authentication.authenticationHeader() } })
            .catch(res => {
                alert("Nie zmieniono roli");
            })
    }

    render() {
        return (
            <div >
                <Navbar />
                <div className='changeRole'>
                    <Form classname="users"
                        description='User upgrade to admin'
                        classNameSelect='usersSelect'
                        classNameInput='userRoleSubmit'
                        onSubmit={this.handleSubmitUser}
                        value={this.state.userId}
                        onChange={this.handleChange}
                        data={this.state.users}
                    />

                    <Form classname='admins'
                        description='Admin downgrade to user'
                        classNameSelect='adminsSelect'
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