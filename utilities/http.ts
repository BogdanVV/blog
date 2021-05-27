import axios from 'axios';

const http = axios.create({
    baseURL: 'https://simple-blog-api.crew.red',
});

export default http;
