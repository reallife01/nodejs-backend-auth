const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

const {logger} = require('./middleware/logEvent')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 2000
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')

const verifyJWT = require('./middleware/verifyJWT')

app.use(logger)

// built in middleware to handle urlencoded daata:
// content-type: application/x-ww-form-urlencoded


app.use(express.urlencoded({extended: false}))

// buit-in middleware for json 
app.use(cookieParser())
app.use(express.json())

app.use(cors(corsOptions))

// serve static files
 
app.use('/',express.static(path.join(__dirname, './public')))
app.use('/', require('./routes/root'))
app.use('/register', require("./routes/register"))
app.use('/auth', require("./routes/auth"))
app.use('/refresh', require("./routes/refresh"))
app.use('/logout', require('./routes/logout'))


app.use(verifyJWT)

app.use('/students', require('./routes/api/students'))

// catch all route to get error 404 page
app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, "views","404.html"))
    }else if (req.accepts('json')) {
        res.join({Error : '404 Not Found'})
    }else {
        res.type('txt').send('404 Not Found')
    }
   
})

app.use(errorHandler)
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`))





 
















































































