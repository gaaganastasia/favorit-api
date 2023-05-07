const Product = require('../models/product');
const NotFoundError = require('../errors/not-found-err');
const CommonError = require('../errors/common-err');

const getProducts = (req, res, next) => {
  Product.find({})
    .then((products) => { res.status(200).send(products); })
    .catch(next);
};

const getProductsA = (req, res, next) => {
  Product.find({})
    .then((products) => { res.status(200).send(products); })
    .catch(next);
};

const createProduct = (req, res, next) => {
  const {
    name, category, partNumber, description, price, video, mainImage, discount
  } = req.body;

  Product.create({
    name, 
    category,
    partNumber,
    description,
    price, 
    video,
    mainImage, 
    discount
  })
    .then((product) => {
      return res.status(200).send(product);
    })
    .catch(next);
};

const deleteProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      if (!product) {
        throw new NotFoundError('Product not found');
      }

      return Product.findByIdAndRemove(req.params.productId)
        .then(() => {
          res.status(200).send(product);
        });
    })
    .catch(next);
};

const changeProduct = (req, res, next) => {
  const { price, discount, name, description } = req.body;

  Product.findByIdAndUpdate(
    req.params.productId,
    { price, discount, name, description },
    { new: true, runValidators: true },
  )
    .then((product) => {
      if (!product) {
        throw new NotFoundError('Product not found');
      }

      res.status(200).send(product);
    })
    .catch(next);
}

module.exports = {
  getProducts, getProductsA, createProduct, deleteProduct, changeProduct
};