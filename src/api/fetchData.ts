import axios from 'axios';
const baseUrl = 'https://jsonplaceholder.typicode.com/';

export const getComments = async () => {
    return axios.get(baseUrl + 'comments')
}

export const getPost = async (id: number) => {
  return axios.get(baseUrl + 'posts/' + id);
}


export const getUser = async (id: number = 1) => {
    return axios.get(baseUrl + 'users/' + id)
}

export const getCommentsByPost = async (postId: number = 1) => {
  return axios.get(baseUrl + 'comments?postId=' + postId)
}