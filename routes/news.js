const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createNew, deleteNew, changeNew
} = require('../controllers/news');

router.post('/', celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    date: Joi.string().required(),
    description: Joi.string().required(),
    mainImage: Joi.string().required(),
  }).unknown(true),
}), createNew);

router.delete('/:newId', celebrate({
  params: Joi.object().keys({
    newId: Joi.string().required().min(24).max(24).hex(),
  }).unknown(true),
}), deleteNew);

router.patch('/:newId', celebrate({
  params: Joi.object().keys({
    newId: Joi.string().required().min(24).max(24).hex(),
  }).unknown(true),
  body: Joi.object().keys({
    title: Joi.string().required(),
    date: Joi.string().required(),
    description: Joi.string().required(),
  }).unknown(true),
}), changeNew)

module.exports = router;