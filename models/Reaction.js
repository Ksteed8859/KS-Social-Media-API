const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: [true, 'This field cannot be empty'],
            max_length: [280, 'Max of 280 characters. Delete some characters and try again.'],
            min_length: [1, 'This field cannot be empty']
          },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)

module.exports = reactionSchema;