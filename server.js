const path = require('path');
const express = require('express');
const app = express();
const db = require('./db');


app.use(require('body-parser').urlencoded({extended: false}));
app.use('/dist', express.static(path.join(__dirname, "/dist")));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})


app.use('/', require('./routes/index'));

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
})

const init = async () => {
  try {
    await db.syncAndSeed();
    const port = process.env.PORT || 3002;
    app.listen(port, () => {
      console.log(`listening on port: ${port}!`);
    });
  } catch(err){
    console.log(err);
  }
};

init();


