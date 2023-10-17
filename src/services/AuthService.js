export const logUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = '/';
}

export const isAuth = () => {
    if(localStorage.getItem('user')) return !!JSON.parse(localStorage.getItem('user')).access_token;
    else return false;
}

export const logout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login';
}