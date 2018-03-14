import axios from 'axios';

const handleError = (err) => {
  if(err.message === "Network Error"){
    return ({message: 'Error on connecting to backend!', status: 500 });
  }

  const { error } = JSON.parse(err.request.response)
  return { message: error, status: err.request.status };
}

export default (token) => {
  const api = axios.create({
    baseURL: 'http://localhost:4000/notes',
    headers: { 'Authorization': token }
  })

  return {
    async getAllNotes(){
      try {
        const res = await api.get('/');
        const {notes} = res.data;
        return notes;
      } catch (err){
        return handleError(err);
      }
    },
  }
};
