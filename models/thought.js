const reactionSchema = require('./Reaction')
const { Schema, model } = require('mongoose');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, 'This field cannot be empty'],
      max_length: [280, 'Max of 280 characters. Delete some characters and try again.'],
      min_length: [1, 'This field cannot be empty']
    },
    createdAt: {
      type: Date,
      default: Date.now,
    
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports= Thought;