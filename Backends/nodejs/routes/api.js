var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');

var todoRepository = {};

router.get('/todo', function (req, res, next) {
  var id = req.query.id;

  if (id) {
    res.json(todoRepository[id])
  }
  else {
    var response = new Array();

    for (var key in todoRepository) {
      response.push(todoRepository[key]);
    }

    res.json(response);
  }
});

router.post('/todo', function (req, res, next) {
  var id = uuid.v4()
  var item = {
    id: id,
    Name: req.body.Name,
    IsCompleted: req.body.IsCompleted
  };

  todoRepository[item.id] = item;

  res.location(req.getUrl() + '?id=' + id);
  res.status(201);
  res.json(item);
});

router.put('/todo', function (req, res, next) {
  var id = req.query.id;

  if (id) {
    todoRepository[id].Name = req.body.Name;
    todoRepository[id].IsCompleted = req.body.IsCompleted;
  }

  res.sendStatus(204);
});

router.delete('/todo', function (req, res, next) {
  var id = req.query.id;

  if (id) {
    delete todoRepository[id];
  }

  res.sendStatus(204);
});

module.exports = router;
