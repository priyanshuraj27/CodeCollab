import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  sentAt: {
    type: Date,
    default: Date.now,
  }
});

const chatSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },

  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

  messages: [messageSchema]
}, {
  timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
