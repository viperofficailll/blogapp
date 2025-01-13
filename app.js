const express = require('express');///basically importing express
const { blog } = require('./model/index');
const blogModel = require('./model/blogModel');

const app = express();

app.set('view engine', 'ejs');//BASICALLT TELLING THE NODE THAT WE ARE USING EJS AS ENGINE


///READING THE DATA SUBMITTED FORM THE FORM
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//BASICALLY TELLING THE APP TO USE URLENCODED FORM DATA


///bascically making connection to the database

require("./model/index")


app.get('/about',(req,res)=> {
    res.render("about.ejs")
})
app.get('/contact',(req,res)=> {
    res.render("contact.ejs")
})
app.get('/blog', (req, res) => {
    res.render("addBlog.ejs")
});
app.post('/addBlog', async (req, res) => {
    // res.send("data submitted successfully")
    const title = req.body.title
    const author = req.body.author
    const description  = req.body.description


    //send this data to the database
    await blog.create(
        {
            title: title,
            author: author,
            description: description
        }
    )
    res.redirect("/")
    
})
//CREATING THE VIEW TEMPLATES

app.get('/', async (req, res) => {
    const blogData = await blog.findAll(); 
    console.log(blogData)// Fetching all blog data
    res.render("land.ejs",{blogs:blogData}); // Pass blog data as 'blogs'
});




///lets run our project in a locahost

app.listen(3000, () =>{
    console.log('Server is running on port 3000');

});
     



