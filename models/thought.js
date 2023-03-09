const { Schema, model } = require('mongoose');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, 'Thought cannot be empty'],
      max_length: [280, 'Thought is too long. Delete some characters'],
      min_length: [1, 'Thought cannot be empty']
    },
    createdAt: {
      type: Date,
      default: Date.now,
    
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model('thought', thoughtSchema);

module.exports= Thought;