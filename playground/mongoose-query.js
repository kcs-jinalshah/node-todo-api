const {ObjectID}=require('mongodb');
var {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');

var id='6241923819dcfd8bdc159f2e';
if(!ObjectID.isValid(id))
{
    console.log('Id not valid');
}

Todo.find({
    _id:id
}).then((todos)=>{
    console.log('Todos',todos);
});

Todo.findOne({
    _id:id
}).then((todos)=>{
    console.log('Todo',todos);
});

Todo.findById(id).then((todos)=>{
    if(!todo)
    {
        return console.log('Id not found');
    }
    console.log('Todo By Id',todos);
}).catch((e)=>console.log(e));