import http from './http'

const addStory = story => {
  return http.post("/stories", story)
}

const getStories = (query = "", params) => {
  return http.get("/stories" + query, { params })
}

const deleteStory = id => http.delete("/stories/" + id)

const getStoryById = id => http.get(`/stories/${id}`)

const editStory = _story => {
  const data = {..._story}
  delete data.id
  return http.put(`/stories/${_story.id}`, data)
}

export {
  addStory,
  getStories,
  deleteStory,
  getStoryById,
  editStory
}