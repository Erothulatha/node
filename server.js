const express = require('express')
const Connection = require("./model/connection")
const app = express()

//testing api
app.get('/', (req, res) => {
    res.send("Welcome")
})

//middleware
app.use(express.json())


//create addnurse2 table
app.get("/createaddnurse", (req, res) => {

    let sql = "create table project1.addnurse2(clinicid int not null ,nurseid int not null primary key,N_firstname varchar(255),N_lastname varchar(255),shiftid int not null,S_time time not null,E_time time not null,S_date date);";

    Connection.query(sql, (err) => {

        if (err) {

            throw err;

        }

        res.send(" table created");

    });

});


//create nurse table
app.get("/createnurse", (req, res) => {

    let sql = "create table project1.nurse(nurseid int not null ,N_firstname varchar(255),N_lastname varchar(255))"
    Connection.query(sql, (err) => {

        if (err) {

            throw err;

        }

        res.send(" table created");

    });

});

//insert data into addnurse2 table
app.post('/addnurse2', (req, res) => {
    const { nurseid,shiftid,clinicid,S_time,E_time,S_date } = req.body
    try {
        let sql = "INSERT INTO project1.addnurse2( nurseid,shiftid,clinicid,S_time,E_time,S_date ) VALUES (?,?,?,?,?,?)";
        Connection.query(sql, [nurseid,shiftid,clinicid,S_time,E_time,S_date], (err, rows, fields) => {
            if (err) {
                console.log("Error while inserting a user into the database", err)
                return res.status(400).send()
            }
            return res.status(201).json({ message: "new user sucessfully created!" })
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).send()
    }
});


//insert data into nurse table
app.post('/nurse', (req, res) => {
    const { nurseid,N_firstname,N_lastname } = req.body
    try {
        let sql = "INSERT INTO project1.nurse( nurseid,N_fistname,N_lastname ) VALUES (?,?,?)";
        Connection.query(sql, [nurseid,N_firstname,N_lastname], (err, rows, fields) => {
            if (err) {
                console.log("Error while inserting a user into the database", err)
                return res.status(400).send()
            }
            return res.status(201).json({ message: "new user sucessfully created!" })
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).send()
    }
});


//retrive data based on clinicid ,shiftid,date
app.post('/getnurse', (req, res) => {
    const {clinicid,shiftid,S_date } = req.body
    try {
        let sql = `
        SELECT project1.nurse.nurseid, project1.nurse.N_firstname, project1.nurse.N_lastname,project1.addnurse2.shiftid,
        project1.addnurse2.clinicid,project1.addnurse2.S_time,project1.addnurse2.E_time,project1.addnurse2.S_date 
        FROM project1.nurse
         LEFT JOIN project1.addnurse2
          ON project1.nurse.nurseid= project1.addnurse2.nurseid 
          where  clinicid=? and shiftid=? and S_date=?`
        Connection.query(sql, [clinicid,shiftid,S_date], (err, rows, fields) => {
            if (err) {
                console.log("Error while inserting a user into the database", err)
                return res.status(400).send()
            }
            return res.status(201).json({ message: rows })
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).send()
    }
});



app.listen(8000, () => {
    console.log("server running");
})












