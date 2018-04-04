const router = require('express').Router();
const mongoose = require('mongoose');
const Suggestion = require('../models/Suggestion');

const groupByField = (array, field) => {
  let result = [];

  array.forEach(item=> {
    if (result.length === 0) {
      return result.push([item]);
    }
    const index = result.findIndex(arr=>arr.find(i=>i[field]===item[field]));

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
  
      res.status(200).json(filterForApproved(groupByField(results, 'articleUrl'),  false ));
    })
    .catch(e => {
      res.status(400).json({
        status: 'Failed',
        message: 'cannot get suggestions'
      })
    })
});


router.patch('/update', (req, res) => {
  const { userText, _id } = req.body;
  if (userText && _id) {
    Suggestion.update({ _id }, { $set: {isApproved: true} }).
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
  const { articleUrl } = req.body;
  if (articleUrl) {
    Suggestion.find({articleUrl})
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
  const {articleUrl, originalText, userText} = req.body;
  console.log(articleUrl, originalText, userText);

  if (articleUrl && originalText && userText) {
    new Suggestion({
      _id: new mongoose.Types.ObjectId(),
      articleUrl,
      originalText,
      userText,
      isApproved: false
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