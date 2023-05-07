const PhotoNew = require('../models/photoNew');
const NotFoundError = require('../errors/not-found-err');
const CommonError = require('../errors/common-err');

const New = require('../models/new');

const getPhotosNews = (req, res, next) => {
  PhotoNew.find({})
    .then((photosNews) => { res.status(200).send(photosNews); })
    .catch(next);
};

const createPhotoNew = (req, res, next) => {
  const {
    link, newId
  } = req.body;

  New.findById(newId)
    .then((news) => {
      if(!news) {
        throw new NotFoundError('The news with this id was not found');
      }

      return PhotoNew.findOne({ link, newId })
      .then((photoNews) => {
        if (!photoNews) {
          return PhotoNew.create({
            link, 
            newId
          })
            .then((readyPhotoNews) => {
              // console.log(readyMovie);
              return res.status(200).send(readyPhotoNews);
            })
            .catch(next);
        }
  
        throw new CommonError('Such a photoNew already exists', 409);
      })
      .catch(next);
    })
    .catch(next);
};

const deletePhotoNew = (req, res, next) => {
  PhotoNew.findById(req.params.photoNewId)
    .then((photoNew) => {
      if (!photoNew) {
        throw new NotFoundError('PhotoNew not found');
      }

      return PhotoNew.findByIdAndRemove(req.params.photoNewId)
        .then(() => {
          res.status(200).send(photoNew);
        });
    })
    .catch(next);
};

module.exports = {
  getPhotosNews, createPhotoNew, deletePhotoNew,
};
