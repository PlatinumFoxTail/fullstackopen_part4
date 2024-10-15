const mongoose = require('mongoose');

//blog schema Mongoose
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

//changes _id object to id string
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    return {
      url: returnedObject.url,
      title: returnedObject.title,
      author: returnedObject.author,
      user: returnedObject.user,
      likes: returnedObject.likes,
      id: returnedObject.id
    }
  }
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
