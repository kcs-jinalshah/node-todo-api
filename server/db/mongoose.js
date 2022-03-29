var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoAppMongoose');

mongoose.connect('mongodb://localhost:27017/NodeTest');

module.exports={
    mongoose
};