const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const {
  getUsers,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getMyProfile,
} = require('../controllers/users');

const { validAuth, validUpdateProfile, validUpdateAvatar } = require('../middlewares/validators');

router.post('/signin', validAuth, login);
router.post('/signup', validAuth, createUser);

router.use(auth);
router.get('/users', getUsers);
router.get('/users/me', getMyProfile);
router.patch('/users/me', validUpdateProfile, updateProfile);
router.patch('/users/me/avatar', validUpdateAvatar, updateAvatar);

module.exports = router;
