const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createProduct, deleteProduct, changeProduct
} = require('../controllers/products');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
    partNumber: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    video: Joi.string().required(),
    mainImage: Joi.string().required(),
    discount: Joi.number().required(),
  }).unknown(true),
}), createProduct);

router.delete('/:productId', celebrate({
  params: Joi.object().keys({
    productId: Joi.string().required().min(24).max(24).hex(),
  }).unknown(true),
}), deleteProduct);

router.patch('/:productId', celebrate({
  params: Joi.object().keys({
    productId: Joi.string().required().min(24).max(24).hex(),
  }).unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    discount: Joi.number().required(),
  }).unknown(true),
}), changeProduct)

module.exports = router;