import mongoose from 'mongoose';

const editorSchema = new mongoose.Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content : {
        type: String,
    }
},{timestamps : true});

export const  Editor = mongoose.model('Editor', editorSchema);