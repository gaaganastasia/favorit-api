const Delivery = require('../models/delivery');
const NotFoundError = require('../errors/not-found-err');
const CommonError = require('../errors/common-err');

const getDeliverys = (req, res, next) => {
  Delivery.find({})
    .then((deliverys) => { res.status(200).send(deliverys); })
    .catch(next);
};

const createDelivery = (req, res, next) => {
  const {
    info,
  } = req.body;

  Delivery.create({
    info
  })
    .then((delivery) => {
      return res.status(200).send(delivery);
    })
    .catch(next);
};

const changeDelivery = (req, res, next) => {
  const { info } = req.body;

  Delivery.findByIdAndUpdate(
    req.params.deliveryId,
    { info },
    { new: true, runValidators: true },
  )
    .then((delivery) => {
      if (!delivery) {
        throw new NotFoundError('Delivery not found');
      }

      res.status(200).send(delivery);
    })
    .catch(next);
}

module.exports = {
  getDeliverys, createDelivery, changeDelivery
};
