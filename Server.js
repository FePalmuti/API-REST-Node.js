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

// Static directory
app.use(express.static("public"));

app.get('/', (req, res) => {
	res.sendFile('/var/www/TP3/index.html');
});

app.get('/books', (req, res) => {
    conec.query("SELECT * FROM books", (error, result, field) => {
        if(error) {
            res.status(400).send();
            console.log("BAD REQUEST");
        }
        else {
            res.status(200).json(result);
            console.log("FOUND");
        }
    });
});

app.get('/books/:bookName', (req, res) => {
    var bookName = req.params.bookName;
    conec.query("SELECT * FROM books WHERE bookName='"+bookName+"'", (error, result, field) => {
        if(error) {
            res.status(400).send();
            console.log("BAD REQUEST");
            console.error(error);
        }
        else {
            res.status(200).json(result);
            console.log("FOUND");
        }
    });
});

app.post('/books', (req, res) => {
    var book = req.body;
    conec.query("INSERT INTO books (bookName, author) VALUES ('"+book["bookName"]+"', '"+book["author"]+"')", (error, result, field) => {
        if(error) {
            res.status(400).send();
            console.log("BAD REQUEST");
        }
        else {
            res.status(201).send();
            console.log("INSERTED -->", book);
        }
    });
});

app.delete('/books/:id', (req, res) => {
    var id = req.params.id;
    conec.query("DELETE FROM books WHERE id="+id, (error, result, field) => {
        if(error) {
            res.status(400).send();
            console.log("BAD REQUEST");
        }
        else {
            res.status(200).send();
            console.log("REMOVED  --> ID =", id);
        }
    });
});

app.put('/books/:id', (req, res) => {
    var id = req.params.id;
    var info = req.body;
    if(info["newBookName"] != "") {
        conec.query("UPDATE books SET bookName='"+info["newBookName"]+"' WHERE id="+id, (error, result, field) => {
            if(error) {
                res.status(400).send();
                console.log("BAD REQUEST");
            }
            else {
                res.status(200).send();
                console.log("UPDATED  --> New 'bookName' =", info["newBookName"]);
            }
        });
    }
    if(info["newAuthor"] != "") {
        conec.query("UPDATE books SET author='"+info["newAuthor"]+"' WHERE id="+id, (error, result, field) => {
            if(error) {
                res.status(400).send();
                console.log("BAD REQUEST");
            }
            else {
                res.status(200).send();
                console.log("UPDATED  --> New 'author' =", info["newAuthor"]);
            }
        });
    }
});

//
