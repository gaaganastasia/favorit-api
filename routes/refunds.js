const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getRefunds, createRefund, deleteRefund, changeRefund
} = require('../controllers/refunds');

// router.get('/', getRefunds);

router.post('/', celebrate({
  body: Joi.object().keys({
    category: Joi.string().required(),
    info: Joi.string().required(),
  }).unknown(true),
}), createRefund);

router.delete('/:refundId', celebrate({
  params: Joi.object().keys({
    refundId: Joi.string().required().min(24).max(24).hex(),
  }).unknown(true),
}), deleteRefund);

router.patch('/:refundId', celebrate({
  params: Joi.object().keys({
    refundId: Joi.string().required().min(24).max(24).hex(),
  }).unknown(true),
  body: Joi.object().keys({
    category: Joi.string().required(),
    info: Joi.string().required(),
  }).unknown(true),
}), changeRefund)

module.exports = router;