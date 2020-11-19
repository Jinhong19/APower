const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors'); 
// hold all routes in routes dir to handel request
const PORT = 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin: '*'}));


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.listen(PORT, () => {
  console.log("The frontend started at PORT " + PORT);
});

/*app.get('/', function(req,res){
    res.render('index.html', { title: 'ScriptWorld' });
})*/