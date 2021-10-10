import React from "react";
import UserForChange from "./UserForChange";

const Form = ({ description, classname, classNameSelect, classNameInput, onSubmit, value, onChange, data }) => {
    return (
        <div>
            <p>{description}</p>
            <form className={classname} onSubmit={onSubmit}>
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
        </div>
    );
};


export default Form;