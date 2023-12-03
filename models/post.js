const mongoose = require('mongoose');
const Schema = mongoose.Schema
const postSchema = new Schema({
   
    title: {
        type: String
    },


    description: {
        type: String
    },

      
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

},
    { timestamps: true }
)
let Post = mongoose.model('post', postSchema);

export default Post