const router = require('express').Router();
const { createUser, getUser, gerUserId } = require('../controllers/users');

router.get('/', getUser);
router.get('/:_id', gerUserId);

router.post('/', createUser);

module.exports = router;
