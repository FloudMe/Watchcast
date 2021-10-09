import React from "react";
import UserForChange from "./UserForChange";

const Form = ({classNameSelect, classNameInput, onSubmit, value, onChange, data}) => {
    return(
        <form onSubmit={onSubmit}>
            <select className={classNameSelect} value={value} onChange={onChange}>
            {data.map(user => (
                <UserForChange name={user.first_name} id={user.uuid} />
            ))}
            </select>
            <p>
                Potwierdz zmiane
            </p>
            <input className={classNameInput} type="submit" value="Zmien" />
        </form>
    ); 
};


export default Form;