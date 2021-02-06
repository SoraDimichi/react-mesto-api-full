const router = require('express').Router();
const { auth } = require('../middlewares/auth');

const { validCreateCard } = require('../middlewares/validators');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.use(auth);
router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.post('/cards', validCreateCard, createCard);

router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
