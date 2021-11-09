const express = require('express');
const app = express()
const port = 3000;
const authorRouter = require('./route/author.js');
app.use(express.json())
app.use('/author' , authorRouter)

  app.get('/', (req, res) => res.json(testData))
  app.listen(port, () => console.log(`Server listening on port ${port}`))