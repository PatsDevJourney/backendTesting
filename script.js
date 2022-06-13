//node modules
const express = require('express') //express
const app = express() //express function
const bodyParser = require("body-parser"); //body parser
const MongoClient = require("mongodb").MongoClient; //mongo DB client
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname)); //adding ability to send static web pages 
app.set("view engine", "ejs"); // setting EJS view engine
let db,
dbConnectionStr = "mongodb+srv://patsdevjourney:Noreen178@cluster0.5gzmd.mongodb.net/?retryWrites=true&w=majority" //connect using this authentication string

//array of objects
let notes = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523" 
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      {  
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]
//Connect to Mongo database
MongoClient.connect(dbConnectionStr)
.then(client =>{
  console.log("Connected to Database");
  const db = client.db("sample_airbnb"); //connect to database sample_airbnb
  const testCollection = db.collection("TestDB"); //connect to collection TestDB
  app.post("/newItem", (request, response) => //post request to add items to TestDB collection
{
    console.log("Hey!");
    testCollection.insertOne(request.body)
    .then(result => console.log(result))
    .then(res =>{
      response.redirect('/');
    })
    .catch(err => console.log(err));
})

  app.get("/index", (req, res) =>{
    db.collection("TestDB").find().toArray()
    .then(results => {
      res.render("index.ejs", {})
    })
    .catch(err => console.log(err))

    
  })
  
})
.catch(error => console.log(error))

// app.get('/', (request, response) => {
    
//     response.sendFile(__dirname + "/index.html");
  
// })

app.get('/api/persons', (request, response) => {
    const num = notes.length;
    response.send(`<h2>Phonebook has info for ${num} people</h2><br>` + new Date());
   
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})