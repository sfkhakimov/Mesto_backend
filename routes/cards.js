const router = require('express').Router();
const { getCard, createCard, deleteCard } = require('../controllers/cards');

router.get('/', getCard);
router.post('/', createCard);
router.delete('/', deleteCard);

module.exports = router;
