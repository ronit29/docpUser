import Cookies from 'universal-cookie';
const cookies = new Cookies();

const STORAGE = {
    setAuthToken: (token) => {
        cookies.set('token', token)
        return Promise.resolve(true)
    },
    getAuthToken: () => {
        return Promise.resolve(cookies.get('token'))
    },
    checkAuth: () => {
        return !!cookies.get('token')
    },
    deleteAuth: () => {
        return Promise.resolve(cookies.remove('token'))
    }
}

export default STORAGE