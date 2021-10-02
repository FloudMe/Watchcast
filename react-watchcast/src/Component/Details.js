import { React, useState } from 'react';
import axios from "axios";


export const Details = ({ _email, _name, _lastName, _country }) => {
    const [email, setEmail] = useState(_email);
    const [name, setName] = useState(_name);
    const [lastName, setLastName] = useState(_lastName);
    const [country, setCountry] = useState(_country);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (email == '' || name == '' || lastName == '' || country == '')
            alert('bledne dane');
        else {
            alert('gut');
            const user = {
                "email": email,
                "name": name,
                "last_name": lastName,
                "country": country
            }
            alert(user);
            // axios.put(`http://localhost:4000/users/update/bb39c8f9-7a15-4172-8264-4c956e741932`/*+ uuid */, {user})
            // .then(res =>{
            //     if(res.status)
            //         alert("Bład! Nie zmieniono danych użtykownika");
            //     else
            //         alert("Pomyslnie zmieniono dane użytkownika");
            // }
            // )
            const response = await axios.put(`http://localhost:4000/users/update/bb39c8f9-7a15-4172-8264-4c956e741932`, user);

            alert(response)
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
