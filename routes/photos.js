const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createPhoto, deletePhoto,
} = require('../controllers/photos');

router.post('/', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required(),
    productId: Joi.string().required().min(24).max(24).hex(),
  }).unknown(true),
}), createPhoto);

router.delete('/:photoId', celebrate({
  params: Joi.object().keys({
    photoId: Joi.string().required().min(24).max(24).hex(),
  }).unknown(true),
}), deletePhoto);

module.exports = router;