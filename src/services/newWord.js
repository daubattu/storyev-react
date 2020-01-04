import http from './http'

const addNewWord = story => {
  return http.post("/newwords", story)
}

const getNewWords = (query = "", params) => {
  return http.get("/newwords" + query, { params })
}

const deleteNewWord = id => http.delete("/newwords/" + id)

const updateNewWord = (id, newWord) => http.put(`/newwords/${id}`, newWord)

export {
  addNewWord,
  getNewWords,
  deleteNewWord,
  updateNewWord
}