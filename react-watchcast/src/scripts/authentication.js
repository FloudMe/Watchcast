const authenticationHeader = () => {
    const token = JSON.parse(localStorage.getItem('user'));

    if (token) {
        return 'Bearer ' + token;
    } else {
        return {};
    }
}

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");

}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const getUserRole = () => {
    return JSON.parse(localStorage.getItem("role"));
}

export default {
    authenticationHeader,
    logout,
    getCurrentUser,
    getUserRole
}