var app = require('express')();
var fs = require('fs');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended : false }));

app.set('views','./views_file');
//express engine에게 jade를 쓸 것이라고 선언
app.set('view engine', 'jade');
app.locals.pretty = true;
//1 .현재 application을 3000포트에 연결
app.listen(3000,()=>{
    console.log("Listening 3000 port")
});

//2. 사용자의 요청을 받은 라우팅
app.get('/topic/new',(req, res)=>{
    fs.readdir('data', (err, files)=>{ //files 인자에는 'data'디렉토리에서 읽어온 파일 제목들이 배열로 담김
        if(err){
            console.log(err);
            res.status(500).send('Interval Server Error');
        }
        res.render('new', {topics : files});}
        )
    }
)


app.get(['/topic', '/topic/:title'], (req, res)=>{//url 배열로 묶음 가능
    fs.readdir('data', (err, files)=>{ //files 인자에는 'data'디렉토리에서 읽어온 파일 제목들이 배열로 담김
        if(err){
            console.log(err);
            res.status(500).send('Interval Server Error');
        }
        //title 값이 있을 때
        var title = req.params.title;
        if(title){
            fs.readFile('data/'+title, 'utf8', (err, data)=>{ // 'data'인자에는 특정 제목으로 읽어온 파일의 내용 포함
            if(err){
                console.log(err);
                res.status(500).send('Interval Server Error');
            }
            res.render('view', {topics : files, title : title, desc : data});
        });}
        //else
        else{
            res.render('view', {topics : files, title : 'welcome', desc : 'Hello Express Server'});
        }
    })
})

app.post('/topic', (req, res)=>{
    var title = req.body.title;
    var desc = req.body.desc;
    fs.writeFile('data/'+title, desc, (err)=>{
        if(err){
            console.log(err);
            res.status(500).send('Interval Server Error');
        }
        res.redirect('/topic/'+title); //사용자가 작성 한 title의 url로 redirect
    });
})




// app.get('/topic/:title',(req, res)=>{
//     var title = req.params.title;
//     fs.readdir('data', (err, files)=>{ //files 인자에는 'data'디렉토리에서 읽어온 파일 제목들이 배열로 담김
//         if(err){
//             console.log(err);
//             res.status(500).send('Interval Server Error');
//         }
//     })
// })