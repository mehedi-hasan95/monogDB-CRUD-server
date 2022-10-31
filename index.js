const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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

        //Display data in client
        app.get('/users', async(req, res) => {
          const query = {};
          const cursor = collection.find(query);
          const users = await cursor.toArray();
          res.send (users);
        })

        // Find a user to update its data
        app.get('/users/:id', async(req, res) => {
          const user = req.params.id;
          const query = { _id: ObjectId(user) };
          const result = await collection.findOne(query);
          res.send(result);
        })

        // Get data from client
        app.post('/users', async(req, res) => {
          const user = req.body;
          const result = await collection.insertOne(user);
          res.send(result);
        })

        // Update users 
        app.put('/users/:id', async(req, res) => {
          const id = req.params.id;
          const filter = { _id: ObjectId(id) };
          const user = req.body;
          const options = { upsert: true };
          const updateUser = {
            $set: {
              name: user.name,
              address: user.address,
              email: user.email,
            }
          }
          const result = await collection.updateOne(filter, updateUser, options);
          res.send(result)
        })


        // Delete from database
        app.delete('/users/:id', async(req, res) => {
          const user = req.params.id;
          const query = { _id: ObjectId(user) };
          const result = await collection.deleteOne(query);
          res.send(result);
          console.log( `Delete User: ${result}` );
        })
    }
    finally {

    }
}
run().catch(err => console.error(err));

// End MongoDB 

app.listen(port, () => {
  console.log(`MongoDB run with curd: ${port}`)
})