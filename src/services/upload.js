import http from './http';

export default (file, options = {}) => {
  const data = new FormData();
  data.append('file', file);
  return http.post('/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...options
  })
}