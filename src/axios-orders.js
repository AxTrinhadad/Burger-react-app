import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerproject-86336.firebaseio.com/',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});

instance.interceptors.request.use(request => {
    console.log('Logging Request',request);

    return request;
}, error => {
    console.log('Logging Request Errors', error);

    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    console.log('Logging Response',response);

    return response;
}, error => {
    console.log('Logging Response Errors', error);

    return Promise.reject(error);
});


export default instance;