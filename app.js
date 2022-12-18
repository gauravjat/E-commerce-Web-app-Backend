const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = process.env.PORT || 9000
app.use(express.json());
const routs = require('./router/Router');
const { error } = require('@hapi/joi/lib/types/alternatives');

app.use(routs);

app.use((err,req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: 0,
      message: err.message
    })
  })
  

app.listen(port, () => {
    console.log(`${port} port is run`);
})

module.exports = app;

