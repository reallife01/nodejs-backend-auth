const express = require('express')
const router = express.Router()
const path = require('path')

// how to get request
router.get('^/$|index(.html)?', (req, res) => {
    //res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, '..', "views", 'index.html'))
})

router.get('^/$|new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', "views", 'new-page.html'))
})

// to redirect

router.get('/old-page.html', (req, res) => {
    // res.redirect(path.join(__dirname, 'views', 'new-page.html')) // 302 by default
    res.redirect(301, "/new-page.html")
   
})

module.exports = router;