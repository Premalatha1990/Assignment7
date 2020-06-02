const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const port = 8900;
const app = express();
let db;
const mongourl = 'mongodb://127.0.0.1:27017/';
const col_name = 'slainfo';

app.use(express.static(__dirname+'/public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

// Get Data from datbase and display on index
app.get('/', (req,res)=>{
    db.collection(col_name).find().toArray((err,result) => {
        if(err) throw err;
        res.render('index.ejs',{data:result})
    })
})

// Post data from ui
app.post('/addData', (req,res) => {
    db.collection(col_name)
        // In Req.body we will recive the data
        // from form.
        .insertOne(req.body, (err,result) => {
            if(err) throw err;
            console.log('data.inserted');
        })
    res.redirect('/');
})

// Delete Selected User
app.delete('/delete_user',(req,res) => {
    db.collection(col_name).findOneAndDelete({
        "title":req.body.title
    },(err,result) => {
        if (err) return res.send(500,err)
        res.send({message: 'success'})
    })
})

// Find user by name
app.post('/find_by_name',(req,res) => {
    let title = req.body.title;
    db.collection(col_name)
      .find({title:title})
      .toArray((err,result) => {
          if(err) throw err;
          res.send(result)
      })
});

// Update User
app.put('/update_user',(req,res)=>{
    db.collection(col_name)
        .findOneAndUpdate({"title":req.body.title},{
            $set:{
                title:req.body.title,
                description:req.body.description,
                date:req.body.date,
                assignee:req.body.assignee
            }
        },{
            upsert:true
        },(err,result) => {
            if(err) return res.send(err);
            res.send(result)
        })
})

// Opening Add User page
app.get('/addUser',(req,res) => {
    res.render('admin')
})

MongoClient.connect(mongourl, {useNewUrlParser:true,useUnifiedTopology:true}, (err,client) => {
    if(err) throw err;
    db = client.db('new_slalist')
    app.listen(port, ()=> {
        console.log(`Server running on port ${port}`)
    })
})