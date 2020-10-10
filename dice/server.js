const express = require('express')
const app = express();
const port = process.env.PORT || 3005;

const routes = require('./api/routes');
routes(app);
app.listen(port, function() {
   console.log('The dice service started on port: ' + port);
});