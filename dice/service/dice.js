var dice = {
  getNumber: function (req, res, next) {
    const number = Math.floor(Math.random() * Math.floor(100)) + 1;
    res.send({ number: number });
  },
};

module.exports = dice;
