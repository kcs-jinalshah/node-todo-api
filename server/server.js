const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID, BSONSymbol}=require('mongodb');

var {mongoose}=require('./db/mongoose');
 var {Todo}=require('./models/todo');
 var {User}=require('./models/user');

 var {authenticate}=require('./middleware/authenticate');

var app=express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo=new Todo({
        text:req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id))
    {
       return res.status(404).send();
    }
    Todo.findById(id).then((todos)=>{
        if(!todos)
            return res.status(404).send();
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
});

app.delete('/todos/:id',(req,res)=>{
    var id=req.params.id;
    if(!ObjectID.isValid(id))
    {
       return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todos)=>{
        if(!todos)
        return res.status(404).send();
        res.send(todos);
    },(e)=>{
        res.status(400).send(e);
    })
});

app.patch('/todos/:id',(req,res)=>{
    var id=req.params.id;
    var body=_.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id))
    {
       return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed)
        body.completedAt=new Date().getTime();
    else
    {
        body.completed=false;
        body.completedAt=null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todos)=>{
        if(!todos)
        return res.status(404).send();
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
});





app.post('/users',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    var user=new User(body);

    user.save().then(()=>{
        //res.send(doc);
      return  user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
});






app.get('/users/me',authenticate,(req,res)=>{
    res.send(req.user);
})

app.listen(3000,()=>
{
    console.log('Started on port 3000');
}
);


// var otherTodo=new Todo({
//     text:'Feed the cat',
//     completed:true,
//     completedAt:123
// });

// otherTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc));
// },(e)=>{
//     console.log('Unable to save todo');
// });

module.exports={
    app
}