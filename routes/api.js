var express = require('express');
var router = express.Router();
var {costRepo} = require('../db');

let getRemoteIp = function(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}
router.get('/getAll', function(req, res, next) {
  if (req.query.year && req.query.month) {
    costRepo.getAllByMonth(req.query.year, req.query.month)
    .then(result => {
      res.send(result);
    });
  } else {
    costRepo.getAll()
    .then(result => {
      res.send(result);
    });
  }
  
});

router.get('/create', function(req, res, next) {
  costRepo.create(req.query.date, req.query.name, req.query.cost, req.query.comment || '',0, getRemoteIp(req))
    .then(result => {
      res.send(result);
    });
});

router.get('/delete', function(req, res, next) {
  costRepo.delete(req.query.id, getRemoteIp(req))
    .then(result => {
      res.send(result);
    })
})

router.get('/magic', function(req, res, next) {
  costRepo.magic()
    .then(result => {
      res.send(result);
    });
});

module.exports = router;
