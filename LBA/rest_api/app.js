const express = require("express");
const { connect } = require("./db/connect");
const routerProducts = require("./routers/product");
const app = express();

const server = require('http').createServer(app); 
const io = require('socket.io')(server);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", routerProducts);

connect("mongodb://localhost:27017/", (err) => {
  if (err) {
    console.log("Erreur lors de la connexion à la base de données");
    process.exit(-1);
  } else {
    console.log("Connexion avec la base de données établie");
    app.listen(3000);
    console.log("Attente des requêtes au port 3OOO");
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

});

server.listen(3002, () => {
  console.log('Socket listening on port 3002');
});



//SHOW COLLECTION

const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017'; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const dbName = 'dbOK';
const collectionName = 'products';

async function showData() {
  try {
    await client.connect();
    const db = client.db(dbName);

    const collection = db.collection(collectionName);
    const documents = await collection.find({}).toArray();

    console.log(documents);
  } catch (err) {
    console.error('Une erreur s\'est produite :', err);
  } finally {
    client.close();
  }
}

showData();
