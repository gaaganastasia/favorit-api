const New = require('../models/new');
const NotFoundError = require('../errors/not-found-err');
const CommonError = require('../errors/common-err');

const getNews = (req, res, next) => {
  New.find({})
    .then((news) => { res.status(200).send(news); })
    .catch(next);
};

const createNew = (req, res, next) => {
  const {
    title, date, description, mainImage
  } = req.body;

  New.create({
    title, 
    date, 
    description,
    mainImage 
  })
    .then((news) => {
      return res.status(200).send(news);
    })
    .catch(next);
};

const deleteNew = (req, res, next) => {
  New.findById(req.params.newId)
    .then((news) => {
      if (!news) {
        throw new NotFoundError('Product not found');
      }

      return New.findByIdAndRemove(req.params.newId)
        .then(() => {
          res.status(200).send(news);
        });
    })
    .catch(next);
};

const changeNew = (req, res, next) => {
  const { title, date, description } = req.body;

  New.findByIdAndUpdate(
    req.params.newId,
    { title, date, description },
    { new: true, runValidators: true },
  )
    .then((news) => {
      if (!news) {
        throw new NotFoundError('Product not found');
      }

      res.status(200).send(news);
    })
    .catch(next);
}

module.exports = {
  getNews, createNew, deleteNew, changeNew
};