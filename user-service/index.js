
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/notes')
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
    })

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
})

const User = mongoose.model('User', userSchema);

app.post('/users', async(req, res) => {
    const { name, email } = req.body;

    try {
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(User);
    } catch (error) {
        console.log("Error Saving user:", error);
        res.status(500).json({ error: 'Unable to save user' });
    }
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

