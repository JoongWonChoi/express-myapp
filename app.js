const bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.locals.pretty = true;

app.use(bodyParser.urlencoded({ extended : false}));

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

app.get('/topic/:id', (req, res)=>{
    var topics = [
        'JavaScript is ... ',
        'Nodejs is  ... ',
        'Express is ... '
    ]
    var output = `
        <a href="/topic?id=0">JavaScript</a><br>
        <a href="/topic?id=1">Nodejs</a><br>
        <a href="/topic?id=2">Express</a><br>
        
        ${topics[req.params.id]}
        `
        //${topics[req.query.id]}
    res.send(output);
});

app.post('/form_receiver', (req, res)=>{
    var title = req.body.title;
    var desc = req.body.desc;
    res.send(title+','+desc);
    //res.send(":Post");
});

app.get('/form', (req, res)=>{
    res.render('form');
});


app.get('/', (req, res)=>{
    res.send("MainPage");
});

app.listen(3000, ()=>{
    console.log("Listening to the 3000 port");
});