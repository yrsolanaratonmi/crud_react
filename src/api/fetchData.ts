import axios from 'axios';
const baseUrl = 'https://jsonplaceholder.typicode.com/';

export const getComments = () => {
    return axios.get(baseUrl + 'comments')
}