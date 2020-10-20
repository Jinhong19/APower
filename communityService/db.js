const mongoose = require('mongoose');
<<<<<<< HEAD
var url = 'mongodb+srv://apower:apowerpassword@cluster1.ieadu.mongodb.net/community?retryWrites=true&w=majority';
=======
require('dotenv').config()

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.ieadu.mongodb.net/community?retryWrites=true&w=majority`;
>>>>>>> f033399858c1f642126081720b8ec4f5b733def2

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