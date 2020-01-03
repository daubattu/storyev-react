import http from './http'

const addNewWord = story => {
  return http.post("/newwords", story)
}

const getNewWords = (query = "", params) => {
  return http.get("/newwords" + query, { params })
}

const deleteNewWord = id => http.delete("/newwords/" + id)

export {
  addNewWord,
  getNewWords,
  deleteNewWord
}