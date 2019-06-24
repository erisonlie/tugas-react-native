const http = require('http');
const express = require('express');
const app = express();
const mysql = require('mysql')
var bodyParser = require('body-parser');

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

app.use('/images', express.static(__dirname + '/images'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    if (req.method === "OPTIONS") {
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        return res.status(200).json({});
    }
    next();
});

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_cinepedia'
})

app.get('/allmovies', (req, res)=>{
    conn.query("Select * from movies", (err, rows)=>{
        res.json(rows)
    })
})

app.get('/movie/:id_movie', (req, res)=>{
    var id_movie = req.params.id_movie
    conn.query("Select * from `movies` where `id_movie` = " + id_movie, (err, rows)=>{
        res.json(rows)
        console.log(rows)
    })
})

app.get('/movie/:id_movie/actor', (req, res)=>{
    var id_movie = req.params.id_movie
    conn.query("SELECT B.`full_name`, B.`profile`, A.`role` FROM `actor_detail` A join `actor` B where A.`id_movie` = " + id_movie + " and A.`id_actor` = B.`id_actor` and A.`id_role` = 1", (err, rows)=>{
        res.json(rows)
    })
})

app.get('/movie/:id_movie/review', (req, res)=>{
    var id_movie = req.params.id_movie
    conn.query("SELECT A.`review_title`, A.`review`, A.`date_added`, A.`rating`, A.`id_user`, B.`username` FROM `review` A join `user` B where A.`id_movie` = " + id_movie + " and A.`id_user` = B.`id_user`", (err, rows)=>{
        res.json(rows)
        console.log(rows)
    })
})

app.get('/movie/:id_movie/review/:star', (req, res)=>{
    var id_movie = req.params.id_movie
    var star = req.params.star
    conn.query("SELECT A.`review_title`, A.`review`, A.`date_added`, A.`rating`, A.`id_user`, B.`username` FROM `review` A join `user` B where A.`rating` = " + star + " and A.`id_movie` = " + id_movie + " and A.`id_user` = B.`id_user`", (err, rows)=>{
        res.json(rows)
        console.log('id_movie' + id_movie + ' | star ' + star)
        console.log(rows)
    })
})

const server = http.createServer(app);
server.listen(8000, ()=>{
    console.log('Connect with port 8000')
})