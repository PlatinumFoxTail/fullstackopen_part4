const dummy = (blogs) => {
    return 1
  }
  
  module.exports = {
    dummy
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    const favourite = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, blogs[0]);
    return {
      title: favourite.title,
      author: favourite.author,
      likes: favourite.likes
    };
  }
  
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}