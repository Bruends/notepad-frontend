import axios from 'axios';

const handleError = (err) => {
  if(err.message === "Network Error"){
    return ('Error on connecting to backend!');
  }

  const { error } = JSON.parse(err.request.response)
  return error;
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
    async saveNote(noteData){
      try {
        await api.post('/', noteData);
        return true;
      } catch (err){
        return handleError(err);
      }
    },

    async editNote(noteData){
      try {
        await api.put('/', noteData);
        return true;
      } catch (err){
        return handleError(err);
      }
    },

    async deleteNote(noteData){
      try {
        await api.delete(`/${noteData.id}`);                  
        return true;
      } catch (err){
        return handleError(err);
      }
    },
  }
};
