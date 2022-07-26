// set up express server
// Step 1 - require express to have instance of express library
const express = require('express')
// Step 2 - create app from that instance
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())


// set up mysql
// STEP 1 - import mysql
const mysql = require('mysql')
//  Step 2 Connect to DB
const db = mysql.createConnection({
    user: 'root',
    host: "localhost",
    password: 'Mysqlrootpass',
    database: "HRapp",

    
})


app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query('INSERT INTO employees (name, age, country, position, wage) VALUES(?,?,?,?,?)',
    [name, age, country, position, wage], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send('values inserted')
        }
    }
    )
})

app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        } 
    })
})

// Step 3 (express) - start app by listening to port
app.listen(3000, () => {
    console.log("server is running on port 3001!")
})