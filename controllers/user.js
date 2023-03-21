const { User, Thoughts } = require('../models');
const userController = {
    allUsers(req, res) {
        User.find({}).populate({
            path: 'thoughts',
            select: '-__v'
        }).populate({
            path: 'friends',
            select: '-__v'
        }).select('-__v').sort({
            _id: -1
        }).then(dbUserData => res.json(dbUserData)).catch(err => res.status(500).json(err));
    },

    idUsers({ params }, res) {
        User.findOne({
            _id: params.id
        }).populate({
            path: 'thoughts',
            select: '-__v'
        }).populate({
            path: 'friends',
            select: '-__v'
        }).select('-__v').then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user with this id was found'
                });
                return;
            }

            res.json(dbUserData);
        }).catch(err => res.status(400).json(err));
    },

    createUsers({ body }, res) {
        User.create(body).then(dbUserData => res.json(dbUserData)).catch(err => res.status(400).json(err));
    },

    deleteUsers({ params }, res) {
        User.findOne({
            _id: params.id
        }).then(dbUserData => {
            Thoughts.deleteMany({
                username: dbUserData.username
            }).then(() => {
                User.findOneAndDelete({
                    _id: params.id
                }).then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({
                            message: 'No user with this id was found'
                        });
                        return;
                    }
    
                    res.json(dbUserData);
                });
            })
        }).catch(err => res.status(400).json(err));
    },

    updateUsers({ params, body }, res) {
        User.findOneAndUpdate({
            _id: params.id
        }, 
        
        body,
        
        {
            new: true,
            runValidators: true
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user with this id was found'
                });
                return;
            }

            res.json(dbUserData);
        }).catch(err => res.status(400).json(err));
    },

    createFriends({ params }, res) {
        User.findOneAndUpdate({
            _id: params.id
        },
        
        {
            $push: {
                friends: params.friendId
            }
        },
        
        {
            new: true,
            runValidators: true
        }).populate({
            path: 'friends',
            select: ('-__v')
        }).select('-__v').then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user with this id was found'
                });
                return;
            }

            res.json(dbUserData);
        }).catch(err => res.status(400).json(err));
    },

    deleteFriends({ params }, res) {
        User.findOneAndUpdate({
            _id: params.id
        },
        
        {
            $pull: {
                friends: params.friendId
            }
        },
        
        {
            new: true
        }).populate({
            path: 'friends', 
            select: '-__v'
        }).select('-__v').then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No user with this id was found'
                });
                return;
            }

            res.json(dbUserData);
        }).catch(err => res.status(400).json(err));
    }
};

module.exports = userController;