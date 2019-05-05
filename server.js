require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(require('body-parser').json());

app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
  res.send(template);

});

let events = [];

app.post('/event',(req,res) => {
 console.log(req.body);

    //check if the event already exists in the events, then updating
    let updatedExistingEvent = false;

    events.forEach(function(event){
        if(event.uuid === req.body.uuid) {
            event.text = req.body.text;
            updatedExistingEvent = true;
        }
    });

    // date exists in events and different event, then add
    if(!updatedExistingEvent) {
        events.push(req.body);
    }
    res.send(events);
});

app.get('/events',(req,res) => {

  //res.send(events);
  res.sendStatus(200);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  const reload = require('reload');
  const reloadServer = reload(server, app);
  require('./webpack-dev-middleware').init(app);
}

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === 'development') {
    require("open")(`http://localhost:${process.env.PORT}`);
  }
});
