
import mongoose from 'mongoose';

const codeSessionSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },

  startedAt: {
    type: Date,
    default: Date.now,
  },

  endedAt: {
    type: Date,
  },

  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

  logs: [{
    timestamp: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    action: {
      type: String,
    },
    content: {
      type: String,
    }
  }]
}, {
  timestamps: true
});

const CodeSession = mongoose.model('CodeSession', codeSessionSchema);

export default CodeSession;
