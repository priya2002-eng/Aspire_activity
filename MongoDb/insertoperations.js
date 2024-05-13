// Title - Inserting the data in Employee database using insertOne and insertMany operations
// Author - Priyadharshini S
// Created Date - 07/05/2024

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

        //insertOne
        const ackResult = await collection.insertOne({
            _id: 9,
            firstName: 'Joe',
            lastName: 'Steves',
            gender: 'male',
            email: 'joe.steve@abc.com',
            salary: 60000,
            department: { name: 'Finance' }
        });

        console.log("The record inserted into the collection with ID: " + ackResult.insertedId);
 
 
        //insertMany      
        const manyDocumentsToInsert = [
            {
                _id: 10,
                firstName: 'Janu',
                lastName: 'Roe',
                gender: 'female',
                email: 'janu@gmail.com',
                salary: 60000,
                department: { name: 'Tester' }
            },{
                _id: 11,
                firstName: 'Maniya',
                lastName: 'Roy',
                gender: 'female',
                email: 'manya@gmail.com',
                salary: 70000,
                department: { name: 'TN' }
            }
        ];

        const manyAckResult = await collection.insertMany(manyDocumentsToInsert);
        console.log("The " + manyAckResult.insertedCount + " records inserted into the collection");

        await client.close();

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongoDB();