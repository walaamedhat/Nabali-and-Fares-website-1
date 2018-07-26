const findNews = require('../models/queries/mediaCenter/findNewsData');


exports.get = (req,res) => {
  console.log(req.params.news_id,'req.params.news_id');
  findNews(req.params.news_id,(err,result) => {
    if (err) {
      console.log(err,'err');
      res.status(500).send(err);
    }
    else {
      console.log(result,'result');
      res.status(200).send({data: result});
    }
  })
}