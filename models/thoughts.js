const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const reactionsSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },

        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 200
        },

        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtval => moment(createdAtval).format('MMM DD, YYYY [at] hh:mm a')
        }
    },

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },

        id: false
    }
);

const thoughtsSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },

        reactions: [reactionsSchema],

        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 200
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtval => moment(createdAtval).format('MMM DD, YYYY [at] hh:mm a')
        }
    },

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },

        id: false
    }
);

thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;