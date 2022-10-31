const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// MidleWare
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// MongoDB Curd UserName & Password 
// UserName: curd
// Password: s3Vf4FMnhgvy6zr1

// Start MongoDB 


const uri = "mongodb+srv://curd:s3Vf4FMnhgvy6zr1@cluster0.k4gmzpi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const collection = client.db("curd").collection("users");
        const users = {
            name: "Mehedi",
            roll: "Head of engineering",
        }
        const result = await collection.insertOne(users);
        console.log(result);
    }
    finally {

    }
}
run().catch(err => console.error(err));

// End MongoDB 

app.listen(port, () => {
  console.log(`MongoDB run with curd: ${port}`)
})