const express = require('express');
const bodyParser = require("body-parser");
const Post = require('./models/post');
const mongoose = require('mongoose');
const { createShorthandPropertyAssignment } = require('typescript');


const app = express();

mongoose.connect("mongodb+srv://VloraGjoka:QuBqs0T45GDKPllG@vlore.soa0p.mongodb.net/DataaseName?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected to database!');
})
 .catch(() => {
     console.log('Connection failed');
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req,res,next) => {
//     console.log('First middleware');
//     //next();
// });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept");
     res.setHeader(
         "Access-Control-Allow-Methods",
         "GET, POST, PATCH, DELETE, OPTIONS"
     );
    next();
    
});

app.post("/api/posts", (req, res ,next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content

    });
    //console.log(post);
    post.save().then(result => {
        console.log(result);
    });
    res.status(201).json ({
        message: 'Post added successfully',
        postId: postId
    })
});


app.get("/api/posts", (req, res ,next) => {
    Post.find().then(documents => {
        res.status(200).json({
                    message: 'Posts fetched succesfully!',
                    posts: documents
                });
    });
    // const post = new Post({
    //     title: req.body.title,
    //     content: req.body.content

    // });
    // //console.log(post);
    //post.save();
   
});

// app.use( '/api/posts', (req,res, next) => {
//     // // res.send('Hello from express!');
//     Post.find().then(documents => {
//     //     console.log(documents);
//     // })
//     // const posts = [
//     // { id: 'faadfd3435k',
//     //  title: 'First server-side post', 
//     //  content: 'this is coming from the server'
//     //  },
//     //  { id: 'jklkjlfd3435k',
//     //  title: 'Second server-side post', 
//     //  content: 'this is coming from the server'
//     //  }
//     // ];
//     res.status(200).json({
//         message: 'Posts fetched succesfully!',
//         posts: documents
//     });
// });
// });
app.delete("/api/posts/:id", (req, res, next) => {
    //console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!"});
    });
});

module.exports = app;