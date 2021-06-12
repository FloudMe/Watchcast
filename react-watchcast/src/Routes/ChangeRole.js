import React, { Component } from "react";
import Navbar from "../Component/Navbar";

class ChangeRole extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            userId: '',
            users: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = ({ target }) => {
        const userId = target.value;
        this.setState({ userId });
    };

    handleSubmit(event) {

    }

    render() {
        return (
            <div >
                <Navbar />
                <div className='changeRole'>
                    <form onSubmit={this.handleSubmit}>
                        <select className='users' value='' onChange={this.handleChange}>

                        </select>
                        <p>
                            Potwierdz zmiane
                        </p>
                        <input className="userRoleSubmit" type="submit" value="Zmien" />
                    </form>
                </div>
            </div>
        )
    }
}

export default ChangeRole;