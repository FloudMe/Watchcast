import axios from "axios";
import { React, useState } from 'react';
import config from '../config';
import authentication from "../scripts/authentication";
import './DetailsAndChangePass.css';

export const Details = ({ _email, _name, _lastName, _country }) => {
    const [email, setEmail] = useState(_email);
    const [name, setName] = useState(_name);
    const [lastName, setLastName] = useState(_lastName);
    const [country, setCountry] = useState(_country);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (email === '' || name === '' || lastName === '' || country === '')
            alert('bledne dane');
        else {
            const user = {
                "email": email,
                "name": name,
                "last_name": lastName,
                "country": country
            }
            await axios.put(config.backendPath + `users/update`, { user },
                { headers: { 'authorization': authentication.authenticationHeader() } })
        }
    }

    return (
        <form className="formDetails" onSubmit={onSubmit}>
            E-mail:<input
                style={email === '' ? { borderBottomColor: "red" } : {}}
                className='detailsFormInput'
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            Name: <input
                style={name === '' ? { borderBottomColor: "red" } : {}}
                className='detailsFormInput'
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            Last name:<input
                style={lastName === '' ? { borderBottomColor: "red" } : {}}
                className='detailsFormInput'
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            Country: <input
                style={country === '' ? { borderBottomColor: "red" } : {}}
                className='detailsFormInput'
                type='text'
                placeholder='Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
            <input className="newDetailsSubmit" type="submit" value="Change user details" />
        </form>
    )
}
