const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express()

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        todo: obj => obj.title,
        id: obj => obj._id,
        completed: obj => obj.completed
    }
}))
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/nodejs-todos', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`))
    } catch (e) {
        console.log(e)

    }
}

start()