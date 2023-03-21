const { User, Thoughts } = require('../models');
const thoughtsController = {
    allThoughts(req, res) {
        Thoughts.find({}).sort({
            _id: -1
        }).then(dbThoughtsData => res.json(dbThoughtsData)).catch(err => res.status(500).json(err));
    },

    idThoughts({ params }, res) {
        Thoughts.findOne({
            _id: params.id
        }).populate({
            path: 'reactions',
            select: '-__v'
        }).select('-__v').then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({
                    message: 'No thoughts with this id was found'
                });
                return;
            }

            res.json(dbThoughtsData);
        }).catch(err => res.json(err));
    },

    createThoughts({ body }, res) {
        Thoughts.create(body).then(({
            _id
        }) => {
            return User.findOneAndUpdate({
                _id: body.userId
            },
            
            {
                $push: {
                    thoughts: _id
                }
            },
            
            {
                new: true,
                runValidators: true
            });
        }).then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({
                    message: 'No thoughts with this id was found'
                });
                return;
            }

            res.json(dbThoughtsData);
        }).catch(err => res.status(400).json(err));
    },

    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({
                _id: params.id
            }).then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({
                        message: 'No thoughts with this id was found'
                    });
                    return;
                }

                res.json(dbThoughtsData);
            }).catch(err => res.status(400).json(err));
    },

    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({
            _id: params.id
        }, 
        
        body,
        
        {
            new: true,
            runValidators: true
        }) .populate({
            path: 'reactions',
            select: '-__v'
        }).select('-__v').then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({
                    message: 'No thoughts with this id was found'
                });
                return;
            }

            res.json(dbThoughtsData);
        }).catch(err => res.status(400).json(err));
    },

    createReactions({ params, body }, res) {
        Thoughts.findOneAndUpdate({
            _id: params.thoughtId
        },
        
        {
            $push: {
                reactions: body
            }
        },
        
        {
            new: true,
            runValidators: true
        }).populate({
            path: 'reactions',
            select: '__v'
        }).select('__v').then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({
                    message: 'No thoughts with this id was found'
                });
                return;
            }

            res.json(dbThoughtsData);
        }).catch(err => res.status(400).json(err));
    },

    deleteReactions({ params }, res) {
        Thoughts.findOneAndUpdate({
            _id: params.thoughtId
        },
        
        {
            $pull: {
                reactions: {
                    reactionId: params.reactionId
                }
            }
        },
        
        {
            new: true
        }).then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({
                    message: 'No thoughts with this id was found'
                });
                return;
            }

            res.json(dbThoughtsData);
        }).catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtsController;