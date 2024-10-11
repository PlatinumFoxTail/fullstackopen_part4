const dummy = (blogs) => {
    return 1
  }
  
  module.exports = {
    dummy
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
  
module.exports = {
    dummy,
    totalLikes
}