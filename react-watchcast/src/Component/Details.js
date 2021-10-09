import { React, useState } from 'react';
import axios from "axios";
import config from '../config';
import authentication from "../scripts/authentication";

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
            await axios.put(config.backendPath + `users/update`, {user}, {headers: { 'authorization': authentication.authenticationHeader() }})
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <input
                type='text'
                placeholder='Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
            <input className="newDetails" type="submit" value="Change user details" />
        </form>
    )
}
