const express = require('express')
const rhymes = require('rhymes')

var app = module.exports = express()
var port = process.env.PORT || 4000

app.get('/', function (req, res) {
  res.redirect('https://github.com/zeke/rhymes-api#readme')
})

app.get('/rhymes/:word', function (req, res) {
  res.json(rhymes(req.params.word))
})

if (!process.parent) {
  app.listen(port, function () {
    console.log(`listening on ${port}`)
  })
}
