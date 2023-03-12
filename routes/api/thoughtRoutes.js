const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtsId/reactions
router.route('/:thoughtsId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughtsId/reactions/:reactionsId
router.route('/:thoughtsId/reactions/:reactionsId')
    .delete(deleteReaction);

module.exports = router;