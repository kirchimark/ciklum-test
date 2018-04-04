const router = require('express').Router();
const fetch = require('node-fetch');
const cheerio = require('cheerio');

router.get('/getArticle', (req, res, next) => {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({
      status: false,
      message: 'no url provided',
    });
  }

  fetch(url)
    .then(html => html.text())
    .then(data => {
      const $ = cheerio.load(data);
      const title = $('.headline').text();
      let parapgraphs = [];
       $('.body-copy p').each(function(i,el){parapgraphs.push($(this).text()) });

      res.json({
        title,
        parapgraphs
      });
    })
    .catch(e => {
      res.status(400).json({
        status: 'Failed',
        message: "can't access that url"
      })
    })
});

module.exports = router;
