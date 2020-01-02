import http from './http'

const addStory = story => {
  return http.post("/stories", story)
}

const getStories = (query = "", params) => {
  return http.get("/stories" + query, { params })
}

const deleteStory = id => http.delete("/stories/" + id)

export {
  addStory,
  getStories,
  deleteStory
}