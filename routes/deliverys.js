const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getDeliverys, createDelivery, changeDelivery
} = require('../controllers/deliverys');

// router.get('/', getDeliverys);

router.post('/', celebrate({
  body: Joi.object().keys({
    info: Joi.string().required(),
  }).unknown(true),
}), createDelivery);

router.patch('/:deliveryId', celebrate({
  params: Joi.object().keys({
    deliveryId: Joi.string().required().min(24).max(24).hex(),
  }).unknown(true),
  body: Joi.object().keys({
    info: Joi.string().required(),
  }).unknown(true),
}), changeDelivery)

module.exports = router;