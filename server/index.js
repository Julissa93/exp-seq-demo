const express = require('express')
const app = express()
const port = 3000
const Sequelize = require('sequelize')
const morgan = require('morgan')
const {db, Cat, Owner} = require('../database/db.js')

app.use(morgan('dev'))

app.get('/', async (req, res, next) => {
    res.send("<h1> Welcome to the main route! </h1>")
})

//EAGER LOADING just means "join"
//select * from users join cats on cats.ownerId = owners.id
app.get('/cats', async (req, res, next) => {
    //res.send('OMG CAAATS')
    try {
        const cats = await Cat.findAll({include: Owner})
        cats[0].sayHello()
        res.send(cats)
    } catch(err) {
        next(err)
    }
})

app.get('/owners', async (req, res, next) => {
    //res.send('Cat Owners!')
    try {
         const owners = await Owner.findAll()
         res.send(owners)
    } catch(err) {
        next(err)
    }
})

app.get('/kittens', async (req, res, next) => {
    try {
        const kittens = await Cat.getKittens()
        res.send(kittens)
    } catch(err) {
        next(err)
    }
})

app.use((req, res) => {
    res.status(404).send('404 NOT FOUND :( ')
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('500 ERROR BOO :(')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))