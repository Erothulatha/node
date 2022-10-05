const express = require('express');
const mysql = require('mysql');
const Connection = require('./model/connection');
const app = express();

//TESTING API
app.get('/', (req, res) => {
    res.send("Welcome")
})

app.use(express.json());



//TABLE_1 :STUDENT TABLE CREATED
app.get('/create1', (req, res) => {

    var sql = "CREATE TABLE project1.student (rollno int primary key auto_increment,name varchar(255),address varchar(255),phno double,age int) ";
    Connection.query(sql, (err, result) => {
        if (err) { throw err; }
        res.send("table created")
    })
}
)

//TABLE_2 :STUDENTCOURSE CREATED
app.get('/create2', (req, res) => {

    var sql = "CREATE TABLE project1.studentcourse (rollno int ,courseid int) ";
    Connection.query(sql, (err, result) => {
        if (err) { throw err; }
        res.send("table created")
    })
}
)

//SELECT QUERY FOR STUDENT TABLE
app.get("/getdata", async (req, res) => {
    try {
        var sql = "SELECT* from project1.student"
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


//SELECT QUERY FOR STUDENTCOURSE TABLE
app.get("/getdata2", async (req, res) => {
    try {
        var sql = "SELECT* from project1.studentcourse"
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

//INSERT DATA INTO STUDENT TABLE
app.post('/add', (req, res) => {
    const { name, address, phno, age } = req.body
    try {
        let sql = "INSERT INTO project1.student(name,address,phno,age) VALUES (?,?,?,?)";
        Connection.query(sql, [name, address, phno, age], (err, rows, fields) => {
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


//INSERT DATA INTO STUDENTCOURSE TABLE
app.post('/add2', (req, res) => {
    const { rollno, courseid } = req.body
    try {
        let sql = "INSERT INTO project1.studentcourse(rollno,courseid) VALUES (?,?)";
        Connection.query(sql, [rollno, courseid], (err, rows, fields) => {
            if (err) {
                console.log("Error while inserting a user into the database", err)
                return res.status(400).send()
            }
            //  return res.status(201).json({ message: "new user sucessfully created!" })
            return res.status(201).json(rows)
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).send()
    }
});

//INNER JOIN QUERY
app.get('/getjoindata', (req, res) => {
    try {
        var sql = "SELECT project1.StudentCourse.courseid, project1.Student.name, project1.Student.age FROM project1.Student INNER JOIN project1.StudentCourse ON project1.Student.rollno = project1.StudentCourse.rollno";

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

//LEFT JOIN QUERY
app.get('/getleftjoindata', (req, res) => {
    try {
        var sql = "SELECT project1.Student.name,project1.StudentCourse.courseid FROM project1.Student LEFT JOIN project1.StudentCourse ON project1.StudentCourse.rollno= project1.Student.rollno;";
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

//RIGHT JOIN QUERY
app.get('/getrightjoindata', (req, res) => {
    try {
        var sql = "SELECT project1.Student.name,project1.StudentCourse.courseid FROM project1.Student RIGHT JOIN project1.StudentCourse  ON project1.StudentCourse.rollno= project1.Student.rollno";
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


app.get('/getfulljoindata', (req, res) => {
    try {

        //  var sql = "SELECT project1.Student.name,project1.StudentCourse.courseid FROM project1.Student FULL JOIN project1.StudentCourse  ON project1.StudentCourse.rollno= project1.Student.rollno";
        var sql = "select * from project1.student full join project1.studentcourse"
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

app.post('/adddata', (req, res) => {
    const { id,firstname,lastname,email } = req.body
    try {
        let sql = "insert into project1.user( id,firstname,lastname,email) select ?,?,?,? from dual where not exists (select firstname from project1.user where firstname='$firstname')";
        Connection.query(sql, [id,firstname,lastname,email], (err, rows, fields) => {
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



app.post("/login", async (req, res) => {
  
      const { id,firstname,lastname,email } = req.body;
      let exist = "select email from  project1.user"
      if(exist){
        return res.status(400).send("Employe Already Exist");
      }
var sql="insert into project1.user (id,firstname,lastname,email) values(?,?,?,?)";
Connection.query(sql,[id,firstname,lastname,email],(err,rows)=>{
    if (err) {
        return res.send(err)
      } else {
          return res.json("inserted sucessfully")
    }
}) 
}
)


// app.post("/login", async (req, res) => {
  
//           const { id,firstname,lastname,email } = req.body;
//           Connection.query('SELECT email FROM project1.user WHERE email ="' + mysql.escape(email) +'"', function (err, result) {
//             if (err) throw err;
//             console.log(result);
//             if(result[0].email.length > 0){  
                
//                 Connection.query('INSERT INTO project1.user (id,firstname,lastname,email) VALUES("'+id+'", "'+firstname+'", "'+lastname+'", "'+email+'")',
//                        [id,firstname,lastname,email]);
        
//                 res.send('Welcome');
//             }
//           })
//         })




app.post("/login", async (req, res) => {

   const name = req.body.name;
    const email= req.body.email
    const phone= req.body.phone;
    const password= req.body.password;
    const password2 = req.body.password2;
    let errors = [];
    var length="";
    if(!name || !email || !phone || !password || !password2){
        errors.push({msg: 'Please fill in all the fields'});
        res.send({message:'Please fill in all the fields'});
    }
    if(password != password2){
        console.log('Passwords dont match');
        errors.push({msg: 'Passwords dont match'});
        res.send({message:'Passwords dont match'});
    }

    if(password.length < 6){
        errors.push({msg: 'Password should be atleast 6 characters'});
        res.send({message:'Password should be atleast 6 characters'});
        
    }
    if(errors.length>0){

    }else{
        Connection.query('SELECT email FROM project1.user WHERE email ="' + mysql.escape(email) +'"', function (err, result) {
            if (err) throw err;
            console.log(result);
            //You will get an array. if no users found it will return.
        
            if(result[0].email.length > 0){  
                //Then do your task (run insert query)
                Connection.query('INSERT INTO project1.user (name, email, phone, password) VALUES("'+name+'", "'+email+'", "'+phone+'", "'+password+'")',
                       [name, email, phone, password]);
                       return res.status(200).send("sucess");
            }
          }
        

        )}
        })
        



app.listen(6000, () => {
    console.log("server running");
})




//...............how to transfer data from one table to another table if the column names are differet but datatypes are same
//create table project1.cust (customerName varchar(255), phonenum double, address1 varchar(255), address2 varchar(255),  city varchar(255));
//create table project1.sub (supplierName varchar(255), phone double, addressLine1 varchar(255), addressLine2 varchar(255),  city varchar(255));
//insert into project1.cust(customerName,phonenum,address1,address2,city) values("a",123445,"abc","def","vizag");
//insert into project1.sub (supplierName,phone,addressLine1,addressLine2,city) select customerName,phonenum,address1,address2,city from project1.cust where  city="vizag";



//........how to transfer data from one table to another table 
//create table project1.countt (totalcount int, totalnum int );
//insert into project1.countt values((select count(*) from project1.demo),(select count(*) from project1.display));


//.............how to concate firstname and lastname in sql
// SELECT id, CONCAT(firstname, ' ',lastname) as full_name, email FROM project1.user;


//........insert data if the user table not exist in name
//   insert into project1.user( id,firstname,lastname,email) select 2,"dilli","bharu","lb@gmail.com" from dual where not exists (select firstname from project1.user where firstname="dilli");


//..............insert only unique values duplicates are not allowed
//SELECT * FROM project1.exam;
// create table project1.exam(id int ,name varchar(255) unique);
// insert into project1.exam(id,name) values(1,"latha"),(2,"l");


//how to create multiple primary keys 
//CREATE TABLE project1. product (  category INT NOT NULL,   id INT NOT NULL, price DECIMAL, PRIMARY KEY(category, id) );










