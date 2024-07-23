import Axios from 'axios';

const axios = Axios.create({
    baseURL: `http://52.66.113.96/i-switch/automation`
})

export default axios;