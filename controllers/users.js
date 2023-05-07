const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err');
const CommonError = require('../errors/common-err');

let userPass = "$2a$10$wH60cnCZHuW7kRt0onqG6uWsOLCupF.LE1uQdTnl4ol7s1.SS5v6q";

const login = (req, res, next) => {
  const { password } = req.body;

  return bcrypt.compare(password, userPass)
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
  
      const token = jwt.sign({ _id: "user"}, 'dev-secret', { expiresIn: '7d' });// process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret'

      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  login
};