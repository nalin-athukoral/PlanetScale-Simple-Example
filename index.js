const express = require('express');
const app = express();
const mysql = require('mysql2')

app.use(express.json());

require('dotenv').config()

// Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL)

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to PlanetScale!');
});


// console.log('Connected to PlanetScale!')
// connection.end()


app.get('/', (req, res) => {
    connection.query('SELECT * FROM categories ', (err, results) => {
        if (err) throw err;
         res.send(results);
        // console.log(results);
    });
    //res.send('Hello World.');;
});

app.get('/post', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
         res.send(results);
        // console.log(results);
    });
    //res.send('Hello World.');;
});

app.post('/', (req, res) => {

    const { name } = req.body;

    connection.query('INSERT INTO categories  (name) VALUES (?)', [name], (err, results) => {
        if (err) throw err;
        res.send(results);
    }
    );

    // res.send(req.body);
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
