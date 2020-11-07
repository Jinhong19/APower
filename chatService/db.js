const mongoose = require('mongoose');

var url = 'mongodb+srv://apower:apowerpassword@cluster1.ieadu.mongodb.net/community?retryWrites=true&w=majority';

mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB Community database.");
});

module.exports = mongoose;