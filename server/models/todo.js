var {mongoose}=require('../db/mongoose')
var Todo=mongoose.model('Todo',{
    text:{
        type:String,
        required:true,
        minlength:10
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    },
    _creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

module.exports={
    Todo
};