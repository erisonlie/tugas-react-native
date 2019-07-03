const http = require('http');
const express = require('express');
const app = express();
const mysql = require('mysql')
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secretKey = 'markLee';

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

app.get('/movie/:id_movie/review/count', (req, res)=>{
    var id_movie = req.params.id_movie
    conn.query("SELECT `rating`, count(`rating`) as count FROM `review` where `id_movie` = " + id_movie + " GROUP BY `rating` UNION ALL SELECT 'ALL' `rating`, count(`rating`) from `review` where `id_movie` = " + id_movie, (err, rows)=>{
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

app.get('/search/:criteria', (req, res)=>{
    var criteria = req.params.criteria
    conn.query("SELECT * FROM `movies` WHERE `title` LIKE '%" + criteria + "%'", (err, rows)=>{
        res.json(rows)
        // console.log(criteria)
        // console.log(rows)
    })
})

app.post('/login', (req, res)=> {
    conn.query(`SELECT * FROM user WHERE email_address = '${req.body.email_address}' AND password = '${req.body.password}'`, (err, rows)=> {
        console.log('a')
        console.log(rows)
        if(rows.length > 0) {
            console.log('b')
            const payload = {
                email_address : rows[0].email_address,
                id : rows[0].id_user
            }

            const token = jwt.sign(payload, secretKey, {expiresIn :'1d'})
            console.log({
                id : rows[0].id_user,
                token : token
            })
            res.json({
                id : rows[0].id_user,
                token : token
            })
        } else {
            console.log('c')
            res.status(400).json({message: 'Email atau password salah'})
        }
    })
})

app.post('/register', (req, res)=>{
    console.log('Masuk')
    var data = ({
        username : req.body.username,
        email_address : req.body.email_address,
        password : req.body.password
    })

    conn.query("INSERT INTO user SET ?", data, (err, rows)=>{
        const payload = {
            id : rows.insertId,
            email : data.email_address
        }

        const token = jwt.sign(payload, secretKey, {expiresIn:'1d'})

        res.json({
            id : data.email_address,
            token : token
        })
    })
})

exports.auth = (req, res, next)=> {
    try {
        const token = req.headers.authorization.split(" ")[1];
        req.userData = jwt.verify(token, secretKey);
        next()
    } catch {
        console.log(err);
        return res.status(401).json({message: 'JWT Token is invalid.'})
    }
}

const server = http.createServer(app);
server.listen(8000, ()=>{
    console.log('Connect with port 8000')
})