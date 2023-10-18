const express = require('express');
const cors = require('cors')
require('dotenv').config()
const app =express();
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
  res.send('brand shop server is running')
})

app.listen(port,()=>{
  console.log(`server is running on PORT: ${port}`);
})









const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fpdogwm.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //server name
const productCollection = client.db('brandShopDB').collection('products')

//store data in database

app.post('/products',async(req,res)=>{
  const newProduct = req.body;
  console.log('new product',newProduct);
  const result = await productCollection.insertOne(newProduct)
  res.send(result)

})

//read data
app.get('/products',async(req,res)=>{
  const cursor=productCollection.find()
  const result=await cursor.toArray();
  res.send(result)
})


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
