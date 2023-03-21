const router = require('express').Router();
const { allThoughts, idThoughts, createThoughts, deleteThoughts, updateThoughts, createReactions, deleteReactions } = require('../../controllers/thoughts');

router.route('/').get(allThoughts).post(createThoughts);
//router.route('/').get(allThoughts);
router.route('/:id').get(idThoughts).put(updateThoughts).delete(deleteThoughts);
//router.route('/:userId').post(createThoughts);
router.route('/:thoughtId/reactions').post(createReactions);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactions);

module.exports = router;