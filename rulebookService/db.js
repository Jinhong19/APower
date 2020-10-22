const mongoose = require('mongoose');
var url = 'mongodb://localhost/rulebookDatabase';

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