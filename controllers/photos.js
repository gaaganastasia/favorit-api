const Photo = require('../models/photo');
const NotFoundError = require('../errors/not-found-err');
const CommonError = require('../errors/common-err');

const Product = require('../models/product');

const getPhotos = (req, res, next) => {
  Photo.find({})
    .then((photos) => { res.status(200).send(photos); })
    .catch(next);
};

const createPhoto = (req, res, next) => {
  const {
    link, productId
  } = req.body;

  Product.findById(productId)
    .then((product) => {
      if(!product) {
        throw new NotFoundError('The product with this id was not found');
      }

      return Photo.findOne({ link, productId })
      .then((photo) => {
        if (!photo) {
          return Photo.create({
            link, 
            productId
          })
            .then((readyPhoto) => {
              // console.log(readyMovie);
              return res.status(200).send(readyPhoto);
            })
            .catch(next);
        }
  
        throw new CommonError('Such a photo already exists', 409);
      })
      .catch(next);
    })
    .catch(next);
};

const deletePhoto = (req, res, next) => {
  Photo.findById(req.params.photoId)
    .then((photo) => {
      if (!photo) {
        throw new NotFoundError('Photo not found');
      }

      return Photo.findByIdAndRemove(req.params.photoId)
        .then(() => {
          res.status(200).send(photo);
        });
    })
    .catch(next);
};

module.exports = {
  getPhotos, createPhoto, deletePhoto,
};
