const Refund = require('../models/refund');
const NotFoundError = require('../errors/not-found-err');
const CommonError = require('../errors/common-err');

const getRefunds = (req, res, next) => {
  Refund.find({})
    .then((refunds) => { res.status(200).send(refunds); })
    .catch(next);
};

const createRefund = (req, res, next) => {
  const {
    category, info,
  } = req.body;

  Refund.create({
    category, 
    info,
  })
    .then((refund) => {
      return res.status(200).send(refund);
    })
    .catch(next);
};

const deleteRefund = (req, res, next) => {
  Refund.findById(req.params.refundId)
    .then((refund) => {
      if (!refund) {
        throw new NotFoundError('Refund not found');
      }

      return Refund.findByIdAndRemove(req.params.refundId)
        .then(() => {
          res.status(200).send(refund);
        });
    })
    .catch(next);
};

const changeRefund = (req, res, next) => {
  const { category, info, } = req.body;

  Refund.findByIdAndUpdate(
    req.params.refundId,
    { category, info, },
    { new: true, runValidators: true },
  )
    .then((refund) => {
      if (!refund) {
        throw new NotFoundError('Refund not found');
      }

      res.status(200).send(refund);
    })
    .catch(next);
}

module.exports = {
  getRefunds, createRefund, deleteRefund, changeRefund
};
