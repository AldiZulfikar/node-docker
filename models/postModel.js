const moongose = require("mongoose")

const postSchema = new moongose.Schema({
    title: {
        type: String,
        require: [true, "Post must have a title"]
    },
    body: {
        type: String,
        require: [true, "post must have body"]
    },
})

const Post = moongose.model("post", postSchema)

module.exports = Post