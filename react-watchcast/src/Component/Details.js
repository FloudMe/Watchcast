import {React, useState} from 'react'

export const Details = ( {_email, _name, _lastName, _country}) => {
    const [email, setEmail] = useState(_email);
    const [name, setName] = useState(_name);
    const [lastName, setLastName] = useState(_lastName);
    const [country, setCountry] = useState(_country);

    const onSubmit = (e) => {
        e.preventDefault();

        if(email == '' || name == '' || lastName == '' || country == '')
            alert('bledne dane');
        else{
            alert('gut');
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
