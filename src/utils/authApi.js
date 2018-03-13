const axios = require('axios');

const url = 'http://localhost:4000/auth';

export const getToken = async (userData) => {
  try {
    const  res = await axios.post(url + '/authenticate', userData);
    const { token } = res.data;
    return { token };
  } catch (err) {
    const  { error }  = JSON.parse(err.request.response);
    throw new Error(error);
  }
}

export const registerUser = async (userData) => {
  try {
    const  res = await axios.post(url + '/register', userData);  
    const { token } = res.data;
    return { token };
  } catch (err) {
    const  { error }  = JSON.parse(err.request.response);
    throw new Error(error);
  }
}
