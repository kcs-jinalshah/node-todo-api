// const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');

// var obj=new ObjectID();
// console.log(obj);

// var user={name:'Jinal',age:25};
// var {name}=user;
// console.log(name);


 MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) =>{
    if(err)
    {
       return console.log('Unable to connect mongodb server');
    }
    console.log('Conneted to mongodb server');
    const db=client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text:'Hello test',
    //     completed:false
    // },(err,result) =>{
    //     if(err)
    //     {
    //         return console.log('Unable to insert todo',err);
    //     }
    //     console.log(JSON.stringify(result.ops));

    //     client.close();
    // });

    // const s = {
    //     name:'Jinal Shah',
    //     age:25,
    //     location:'Inadia'
    // }

    // db.collection('Users').insertOne(s,(err,result) =>{
    //     if(err)
    //     {
    //         return console.log('Unable to insert user',err);
    //     }
    //     console.log(result);

    //     client.close();
    // });

    // // db.collection('Todos').find().toArray().then((docs)=>{
    //     db.collection('Todos').find({completed:true}).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs));
    // },(err)=>{
    //     console.log('Unable to fetch todo',err);
    // });


    db.collection('Todos').find().count().then((count)=>{
        console.log(`Todos count : ${count}`);
    },(err)=>{
        console.log('Unable to fetch todo',err);
    });
    
});