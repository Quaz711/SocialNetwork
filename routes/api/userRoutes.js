const router = require('express').Router();
const { allUsers, idUsers, createUsers, deleteUsers, updateUsers, createFriends, deleteFriends } = require('../../controllers/user');

router.route('/').get(allUsers).post(createUsers);
router.route('/:id').get(idUsers).put(updateUsers).delete(deleteUsers);
router.route('/:id/friends/:friendId').post(createFriends).delete(deleteFriends);

module.exports = router;