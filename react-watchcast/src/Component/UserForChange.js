import React from "react";

const UserForChange = ({name, id}) => {
    return(
        <option value={id} >{name}</option>
    ); 
};


export default UserForChange ;