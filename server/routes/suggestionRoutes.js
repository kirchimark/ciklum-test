const router = require('express').Router();
const mongoose = require('mongoose');
const Suggestion = require('../models/Suggestion');

const groupByUrlAndField = (array, field) => {
  let result = [];

  array.forEach(item=> {
    if (result.length === 0) {
      return result.push([item]);
    }
    const index = result.findIndex(arr=>arr.find(i=>i[field]===item[field] && i['articleUrl'] === item['articleUrl'] ));

    if (index === -1)
      result.push([item])
    else
      result[index].push(item);
  });

  return result;
}

const filterForNotApproved = (array, approved) => array.filter(arr=>arr.every(sug=>sug.isApproved===approved));
const filterForApproved = (array, approved) => array.filter(arr=>arr.some(sug=>sug.isApproved===approved));

router.get('/fetchAll/:approved', (req, res) => {
  const { approved } = req.params;
  Suggestion.find()
    .select('isApproved _id articleUrl originalText userText')
    .exec()
    .then(results => {
      const filter = approved === 'approved' ? filterForApproved : filterForNotApproved
      const arg = approved === 'approved' ? true : false;
  
      res.status(200).json(filter(groupByUrlAndField(results, 'originalText'),  arg ));
    })
    .catch(e => {
      res.status(400).json({
        status: 'Failed',
        message: 'cannot get suggestions'
      })
    })
});


router.post('/update', (req, res) => {
  const { _id, value } = req.body;

  if (_id && value) {
    Suggestion.update({ _id }, { $set: {isApproved: value} }).
    then(() => {
      res.status(200).json({
          status: 'Succeeded',
          message: 'saggestion updated'
      })
    })
    .catch(e => {
      res.status(400).json({
        status: 'Failed',
        message: 'cannot delete suggestion'
      });
    })
  
  } else {
    res.status(400).json({
      status: 'Failed',
      message: 'cannot get suggestions'
    })
  }
});

router.delete('/delete', (req, res) => {
  const { articleUrl, originalText } = req.body;
  if (articleUrl) {
    Suggestion.find({articleUrl, originalText})
      .remove()
      .exec()
      .then(() => {
        res.status(200).json({
          status: 'Succeeded',
          message: 'saggestion deleted'
        });
      })
      .catch(e => {
        res.status(400).json({
          status: 'Failed',
          message: 'cannot delete suggestion'
        });
      })
  } else {
    res.status(400).json({
      status: 'Failed',
      message: 'not all params are provided'
    });
  }
});

router.post('/save', (req, res) => {
  const {articleUrl, originalText, userText, value} = req.body;

  if (articleUrl && originalText && userText) {
    new Suggestion({
      _id: new mongoose.Types.ObjectId(),
      articleUrl,
      originalText,
      userText,
      isApproved: value === 'approved'  ? true: false
    }).save()
    .then(() => {
      res.json({
        status: 'Succeeded',
        message: 'saggestion saved'
      });
    })
    .catch(e => {
      res.status(400).json({
        status: 'Failed',
        message: 'cannot save entry suggestion'
      })
    });
  } else {
    res.status(400).json({
      status: 'Failed',
      message: 'not all params are provided'
    });
  }
});


module.exports = router;