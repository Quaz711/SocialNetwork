const router = require('express').Router();
const { allThoughts, idThoughts, createThoughts, deleteThoughts, updateThoughts, createReactions, deleteReactions } = require('../../controllers/thoughts');

router.route('/').get(allThoughts).post(createThoughts);
router.route('/:id').get(idThoughts).put(updateThoughts).delete(deleteThoughts);
router.route('/:thoughtsId/reactions').post(createReactions);
router.route('/:thoughtsId/reactions/:reactionsId').delete(deleteReactions);

module.exports = router;