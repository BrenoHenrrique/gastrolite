export const isAuthenticated = () => {
    return !!sessionStorage.getItem("auth");
}

export const getUserLogged = () => {
    if(sessionStorage.getItem("auth")) {
        return JSON.parse(sessionStorage.getItem('auth'));
    }
}