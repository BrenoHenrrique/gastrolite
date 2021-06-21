export const isAuthenticated = () => {
    return !!localStorage.getItem("auth");
}

export const getUserLogged = () => {
    if(localStorage.getItem("auth")) {
        return JSON.parse(localStorage.getItem('auth'));
    }
}