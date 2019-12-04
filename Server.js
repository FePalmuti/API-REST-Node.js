const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(7000);

const conec = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Library'
});

conec.connect(error => {
    if(error) {
        res.end(error.toString());
        throw error;
    }
});

app.get('/', (req, res) => {
	res.sendFile('/var/www/TP3/index.html');
});

app.get('/ClientSide.js', (req, res) => {
	res.sendFile('/var/www/TP3/ClientSide.js');
});

app.get('/books', (req, res) => {
    conec.query("SELECT * FROM books", (error, result, field) => {
        if(error) {
            res.status(400).send();
            console.error(error);
        }
        else {
            res.json(result);
            res.status(200).send();
        }
    });
});

app.get('/books/:id', (req, res) => {
    var id = req.params.id;
    conec.query("SELECT * FROM books WHERE id="+id+"", (error, result, field) => {
        if(error) {
            res.status(400).send();
            console.error(error);
        }
        else {
            res.json(result);
            res.status(200).send();
        }
    });
});

app.post('/books', (req, res) => {
    var book = req.body;
    console.log("INSERTION -", book);
    conec.query("INSERT INTO books (id, bookName, author) VALUES ("+book["id"]+", '"+book["bookName"]+"', '"+book["author"]+"')", (error, result, field) => {
        if(error) {
            res.status(400).send();
            console.error(error);
        }
        else {
            res.status(200).send();
        }
    });
});

app.delete('/books/:id', (req, res) => {
    var id = req.params.id;
    conec.query("DELETE * FROM books WHERE id="+id+"", (error, result, field) => {
        if(error) {
            res.status(400).send();
            console.error(error);
        }
        else {
            res.status(200).send();
        }
    });
});
