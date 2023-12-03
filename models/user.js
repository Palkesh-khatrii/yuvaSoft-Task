const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String
    },

},
    { timestamps: true }
)
let User = mongoose.model('user', userSchema);

export default User