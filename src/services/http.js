import axios from 'axios';

// const isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(promise => {
//     if (error) {
//       promise.reject(error);
//     } else {
//       promise.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 4000
});

// Add a request interceptor
instance.interceptors.request.use(
  request => {
    // Do something before request is sent
    if (!request.headers.Authorization) {
      const token = localStorage.getItem('token');

      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    }

    return request;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      localStorage.removeItem('token');
      window.location.replace('/login');

      // if (isRefreshing) {
      //   return new Promise((resolve, reject) => {
      //     failedQueue.push({ resolve, reject });
      //   })
      //     .then(token => {
      //       originalRequest.headers.Authorization = `Bearer ${token}`;
      //       return instance(originalRequest);
      //     })
      //     .catch(err => {
      //       return Promise.reject(err);
      //     });
      // }

      // originalRequest._retry = true;
      // isRefreshing = true;

      // const refreshToken = window.localStorage.getItem('refreshToken');
      // return new Promise((resolve, reject) => {
      //   instance
      //     .post('/auth/refresh', { refreshToken })
      //     .then(({ data }) => {
      //       window.localStorage.setItem('token', data.token);
      //       window.localStorage.setItem('refreshToken', data.refreshToken);
      //       instance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      //       originalRequest.headers.Authorization = `Bearer ${data.token}`;
      //       processQueue(null, data.token);
      //       resolve(instance(originalRequest));
      //     })
      //     .catch(err => {
      //       processQueue(err, null);
      //       reject(err);
      //     })
      //     .then(() => {
      //       isRefreshing = false;
      //     });
      // });
    }

    return Promise.reject(error);
  }
);

export default instance;
