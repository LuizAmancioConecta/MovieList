const express = require('express')
const Author = require('../models/author')
const router = express.Router()



//ALL AUTHORS ROUTE
router.get('/', async (req,res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name != ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query 
        })
        } catch{
        res.redirect('/')//redireciona para a home page
    }
    
})


//NEW AUTHOR ROUTE
router.get('/new',(req,res) => {
    res.render('authors/new', { author: new Author()})
})


//CREATE AUTHOR ROUTE
router.post('/', async (req, res) => {
    let locals = { errorMessage : `something went wrong` }
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`) 
        res.redirect(`authors`)

    } catch{
        res.render(`authors`, locals)

    }
})
module.exports = router