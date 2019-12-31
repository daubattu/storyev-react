import http from './http'

const addStory = story => {
  return http.post("/stories", story)
}

export {
  addStory
}