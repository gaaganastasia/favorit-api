const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');
const { sendOrder } = require('../controllers/orders');

const { getProducts } = require('../controllers/products');
const { getProductsA } = require('../controllers/products');
const routerProducts = require('./products.js');

const { getPhotos } = require('../controllers/photos');
const routerPhotos = require('./photos.js');

const { getNews }  = require('../controllers/news');
const routerNews = require('./news.js');

const { getPhotosNews }  = require('../controllers/photosNews');
const routerPhotoNews = require('./photosNews.js');

const { getDeliverys } = require('../controllers/deliverys');
const routerDeliverys = require('./deliverys.js');

const { getRefunds } = require('../controllers/refunds');
const routerRefunds = require('./refunds.js');

const { auth } = require('../middlewares/auth.js');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8),
  }),
}), login);
router.post('/orders', celebrate({
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
}), sendOrder);

router.get('/products', getProducts);
router.get('/products/a', auth, getProductsA);
router.use('/products', auth, routerProducts);

router.get('/photos', getPhotos);
router.use('/photos', auth, routerPhotos);

router.get('/news', getNews);
router.use('/news', auth, routerNews);

router.get('/photosNews', getPhotosNews);
router.use('/photosNews', auth, routerPhotoNews);

router.get('/deliverys', getDeliverys);
router.use('/deliverys', auth, routerDeliverys);

router.get('/refunds', getRefunds);
router.use('/refunds', auth, routerRefunds);

router.use(/\//, auth);

module.exports = router;