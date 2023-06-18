const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema(
    {
        title:{
            type:String,
            required:true,

        },
        description:{
            type:String,
            required:true,
        },
        tag:{
            default:"general",
            type:String
        },

        date:{
            type:String,
            required:true,
            default:Date.now,

        }

    }
);
module.exports = mongoose.model("User", NoteSchema);