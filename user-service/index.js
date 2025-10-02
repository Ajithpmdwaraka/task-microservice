
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3001

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


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

