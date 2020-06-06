import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3666"

});

export default api;