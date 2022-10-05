const { application } = require('express')
const express = require('express')
const mysql = require('mysql')
//const albumRoutes = require("./routes/album")
const Connection = require("./model/connection")


const app = express()


//TESTING GET API
app.get('/', (req, res) => {
    res.send("Welcome")
})

//app.use("/album", albumRoutes)

app.use(express.json())
//app.use(express.urlencoded({ extended: true }));


//CREATE TABLE 
app.get("/createemployee", (req, res) => {

    let sql = "CREATE TABLE project1.employees(id int primary key AUTO_INCREMENT, fname VARCHAR(255), email VARCHAR(255),password varchar(255))";

    Connection.query(sql, (err) => {

        if (err) {

            throw err;

        }

        res.send("Employee table created");

    });

});

//SELECT QUERY
app.get("/read", async (req, res) => {
    try {
        var sql = "SELECT* from project1.employees"
        Connection.query(sql, (err, results, fields) => {
            if (err) {
                console.log("error while get data", err)
                return res.status(400).send()

            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()

    }
})


//SELECT BASED ON GMAIL
app.get("/read/:email", async (req, res) => {
    const email = req.params.email;
    try {

        var sql = "SELECT *from project1.employees WHERE  email=?"
        Connection.query(sql, [email], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

//SELECT QUERY USING AND OPERATOR
app.get("/read1", async (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    try {

        var sql = "SELECT fname FROM project1.employees WHERE id=? AND email=?;"
        Connection.query(sql, [id, email], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

//SELECT QUERY USING OR OPERATOR
app.get("/read2", async (req, res) => {

    try {

        var sql = "SELECT fname FROM project1.employees WHERE country='india' OR country='dilli'";
        Connection.query(sql, (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

//SELECT QUERY USING LIMIT
app.get("/read4", async (req, res) => {
    try {
        var sql = "SELECT* from project1.employees LIMIT 3"
        Connection.query(sql, (err, results, fields) => {
            if (err) {
                console.log("error while get data", err)
                return res.status(400).send()

            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()

    }
})

//USING LIKE OPERATOR
app.get("/read3", async (req, res) => {
    // const id=req.body.id;
    // const email = req.body.email;
    try {

        var sql = "SELECT  email FROM project1.employees WHERE fname like 'u%';;"
        Connection.query(sql, (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})


//COUNT QUERY
app.get("/countquery", async (req, res) => {
    try {
        var sql = "SELECT count(*) from project1.employees"
        Connection.query(sql, (err, results, fields) => {
            if (err) {
                console.log("error while get data", err)
                return res.status(400).send()

            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()

    }
})

//SHOW DATABASES
app.get("/showdatabases", async (req, res) => {
    try {
        var sql = "SHOW DATABASES"
        Connection.query(sql, (err, results, fields) => {
            if (err) {
                console.log("error while get data", err)
                return res.status(400).send()

            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()

    }
})

//ALTER  ADD COLUMN
app.get("/addition", (req, res) => {
    try {
        var sql = "alter table project1.employees ADD column (empcountry varchar(255)not null)"
        Connection.query(sql, (err, results, field) => {

            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

//rename table column 
app.get('/renamedata', (req, res) => {
    try {
        var sql = "alter table project1.album change column albumname name varchar(255)"
        Connection.query(sql, (err, rows) => {
            if (err) {
                console.log("err")
                return res.status(400).send()
            }
            return res.status(200).send("rename sucessfully")
        })
    } catch (err) {
        console.log("err")
        return res.status(500).send()

    }
})

//ALTER DROP COLUMN
app.get("/editcolumn", (req, res) => {
    try {
        var sql = "alter table project1.employees DROP empcountry"
        Connection.query(sql, (err, results, field) => {

            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})


//DROP TABLE
app.get("/droptable", (req, res) => {
    try {
        var sql = "DROP table project1.employees"
        Connection.query(sql, (err, results, field) => {

            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

//RENAME TABLE
app.get("/renametable", (req, res) => {
    try {
        var sql = "RENAME table project1.album to project1.company"
        Connection.query(sql, (err, results, field) => {

            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})


//TRUNCATE TABLE
app.get("/truncatedata", (req, res) => {
    try {
        var sql = "truncate table project1.employees"
        Connection.query(sql, (err, results, field) => {

            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})


//INSERT QUERY
app.post('/add', (req, res) => {
    const { fname, email, password } = req.body
    try {
        let sql = "INSERT INTO project1.employees(fname,email,password) VALUES (?,?,?)";
        Connection.query(sql, [fname, email, password], (err, rows, fields) => {
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


//insert data from one table to another table 
app.post('/transferdata', (req, res) => {
    const { name } = req.body
    try {
        let sql = "INSERT INTO project1.display SELECT * FROM project1.demo  WHERE name = ?";
        Connection.query(sql, [name], (err, rows, fields) => {
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


//const pool = new mysql.ConnectionPool(string)


app.post('/bulkdata',function create(req, res) {
    
      let { id, name} = req.body
      let values = [{
        id: id,
        name:name
      }]
      let sql = 'INSERT INTO project1.exam(id,name) values ?,?'
      Connection.query(sql, values, (err, results) => {
        if (err) {
          return res.send(err)
        } else {
            return res.json("inserted sucessfully")
      }
    })
})
  


app.post('/transferdata', (req, res) => {
    const { name } = req.body
    try {
        let sql = "INSERT INTO project1.display SELECT * FROM project1.demo  WHERE name = ?";
        Connection.query(sql, [name], (err, rows, fields) => {
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




app.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const fname = req.body.fname;
    const email = req.params.email;
    const password = req.body.password;
    try {
        var sql = "UPDATE project1.employees set password=? where email=?"
        Connection.query(sql, [fname, email, password], (err, results, field) => {
            if (err) {
                console.log(err);
                return res.status(400).send()
            }
            // if(results.affectedRows===0){
            //     return res.status(404).json({message:"No user with that email"})
            // }
            //return res.status(200).json({message:"user data updated sucessfully"})
            return res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()

    }
})



app.post('/edit/:id', function (req, res) {
    var id = req.params.id;
    var updateData = req.body;
    var sql = `UPDATE project1.employees SET ? WHERE id= ?`;
    Connection.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    res.send("updated sucessfully")
})


//UPDATE QUERY
app.put('/edit1/:id', function (req, res) {
    var id = req.params.id;
    var updateData = req.body;
    try {
        var sql = `UPDATE project1.employees SET ? WHERE id= ?`;
        Connection.query(sql, [updateData, id], function (err, data) {
            if (err) {
                console.log(err);
                return res.status(400).send()
            }
            if (data.affectedRows === 0) {
                return res.status(404).json({ message: "no user with that ID" })
            }
            return res.status(200).json({ message: "user updated sucessfully" })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})



//DELETE QUERY
app.delete("/delete/:email", async (req, res) => {
    email = req.params.email
    try {
        var sql = "DELETE from project1.employees WHERE email=?"
        Connection.query(sql, [email], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send()
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "No user with that email" })
            }
            return res.status(200).json({ message: "user deleted sucessfully" })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})


//delete bulk data based on "id"
app.delete("/deletedata/:id", async (req, res) => {
    id = req.params.id
    try {
        var sql = "DELETE from project1.demo where id>=?"
        Connection.query(sql, [id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send()
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "No user with that email" })
            }
            return res.status(200).json({ message: "user deleted sucessfully" })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

//delete bulk of data based on "samename"
app.delete("/deletedname/:name", async (req, res) => {
    const name = req.params.name
    try {
        var sql = "DELETE from project1.demo WHERE name=?"
        Connection.query(sql, [name], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send()
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "No user with that email" })
            }
            return res.status(200).json({ message: "user deleted sucessfully" })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

app.delete("/deleted", async (req, res) => {

    try {
        var sql = "DELETE from project1.demo where( id  and id) IN ?";

        const values = [
            { id: 4, id: 5 },
            { id: 3, id: 6 }
        ]
        Connection.query(sql, values, (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send()
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "No user with that email" })
            }
            return res.status(200).json({ message: "user deleted sucessfully" })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})





app.use('/deletebulk', async (req, res) => {
    var deleteRooms = [[3, 23], [4, 23], [5, 23], [2, 23]];

    connection.query("DELETE FROM project1.demo WHERE (room_id, rate_plan_id) IN (?)",
        [deleteRooms], function (err, results) {

            if (err) return console.log(err)
            else console.log('sended');
        })
})



//----------GROUPBY ---------------

//INSERT QUERY
app.post('/insertdata', (req, res) => {
    const { albumid, albumname, dept, salary } = req.body
    try {
        let sql = "INSERT INTO project1.album(albumid,albumname,dept,salary) VALUES (?,?,?,?)";
        Connection.query(sql, [albumid, albumname, dept, salary], (err, rows, fields) => {
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

//select "SUM" query
app.get("/selectdata", async (req, res) => {
    try {
        var sql = "SELECT SUM(salary) from project1.album";
        Connection.query(sql, (err, results, fields) => {
            if (err) {
                console.log("error while get data", err)
                return res.status(400).send()

            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()

    }
})

//select GROUP BY query
app.get("/groupdata", async (req, res) => {
    try {
        var sql = "SELECT dept,sum(salary) from project1.album group by dept order by dept desc"
        Connection.query(sql, (err, results, fields) => {
            if (err) {
                console.log("error while get data", err)
                return res.status(400).send()

            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()

    }
})

//WHERE CONDITION
app.get("/wheredata", async (req, res) => {
    try {
        var sql = "SELECT dept,sum(salary) from project1.album  where dept IN('a','c') group by dept  order by dept desc"
        Connection.query(sql, (err, results, fields) => {
            if (err) {
                console.log("error while get data", err)
                return res.status(400).send()

            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()

    }
})


//HAVING CONDITION
app.get("/wheredata", async (req, res) => {
    try {
        var sql = "SELECT dept,sum(salary) from project1.album  where dept IN('a','c') group by dept  having  sum(salary)>25000 order by dept desc"
        Connection.query(sql, (err, results, fields) => {
            if (err) {
                console.log("error while get data", err)
                return res.status(400).send()

            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()

    }
})


//count query based on group by
app.get("/countdata", async (req, res) => {
    try {
        var sql = "SELECT dept,count(*) from project1.album group by dept order by dept desc"
        Connection.query(sql, (err, results, fields) => {
            if (err) {
                console.log("error while get data", err)
                return res.status(400).send()

            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()

    }
})


//SELECT DISTINCT QUERY
app.get("/distinctdata", async (req, res) => {
    try {
        var sql = "SELECT DISTINCT  salary  from  project1.album"
        Connection.query(sql, (err, results, fields) => {
            if (err) {
                console.log("error while get data", err)
                return res.status(400).send()

            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send()

    }
})



//SERVER CONNECTION
app.listen(3000, () => {
    console.log("server running")


});