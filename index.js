const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//Database connection

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9rpk71q.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const TaskCollection = client.db("Taskey").collection("TaskCollection");
        
        app.post('/add-task', async (req, res) => {
            const task = req.body;
            console.log(task);
            const result = await TaskCollection.insertOne(task);
            console.log(result);
            res.send(result);
        });
    }
    finally {
        
    }
}

run().catch(err => console.log(err))


app.get('/', async (req, res) => {
    res.send('Taskey server is running');
})

app.listen(port, () => console.log(`Taskey running on ${port}`))
