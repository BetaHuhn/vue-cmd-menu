// Used to host the static files on Deta (https://deta.sh)
const express = require('express')
const app = express()

app.use(express.static('dist'))

module.exports = app