const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/community', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB Community database.");
});

module.exports = mongoose;