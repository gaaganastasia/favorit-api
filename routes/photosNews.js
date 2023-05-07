const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createPhotoNew, deletePhotoNew,
} = require('../controllers/photosNews');

router.post('/', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required(),
    newId: Joi.string().required().min(24).max(24).hex(),
  }).unknown(true),
}), createPhotoNew);

router.delete('/:photoNewId', celebrate({
  params: Joi.object().keys({
    photoNewId: Joi.string().required().min(24).max(24).hex(),
  }).unknown(true),
}), deletePhotoNew);

module.exports = router;