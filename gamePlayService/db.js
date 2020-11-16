  
const mongoose = require('mongoose');
require('dotenv').config()

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.ieadu.mongodb.net/gamePlay?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB rulebook database.");
});

module.exports = mongoose;