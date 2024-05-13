// Title - Updating the data in Employee database using updateOne and updateMany operations
// Author - Priyadharshini S
// Created Date - 08/05/2024

const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/aspire';

const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();  

        const db = client.db('aspire');
        const collection = db.collection('employee');

        const cursor = collection.find({});
        await cursor.forEach(record => {
            console.log(record);
        });
        
        //updateOne
        const updateResult = await collection.updateOne(
            { _id: 7 },
            { $set: { salary: 60000 } }
        );
        console.log("Updated " + updateResult.modifiedCount + " document");


        //updateMany       
        const updateManyResult = await collection.updateMany(
            { department: { name: 'Finance' } }, 
            { $set: { lastName:'Tendul' } } 
        );
        console.log("Updated " + updateManyResult.modifiedCount + " documents");

        await client.close();

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongoDB();