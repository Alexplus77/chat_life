const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 3001
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'build')))

let db = [] /* База данных */

app.get('/api', (req, res) => {
    setTimeout(() => res.status(200).json(db), 1500)
})

app.delete('/api', (req, res) => {
    db = db.filter(el => el.id !== Number(req.query.id))
    setTimeout(() => res.status(201).json(db), 1500)
})
app.post('/api', (req, res) => {
    db.push({...req.body, id: Math.random()})
    setTimeout(() => res.status(201).json(db), 1500)
})

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`)
})
