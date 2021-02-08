export const isAuthenticated = () => {
    if(sessionStorage.getItem("auth")) {
        return JSON.parse(sessionStorage.getItem('auth'));
    }
}