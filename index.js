// const express = require("express")
// const app = express()
// const expressLayouts = require("express-ejs-layouts")
// const fs = require("fs")

// //MiddleWare
// //this will help us use our layout file
// //use is a method in express 
// app.use(expressLayouts)

// app.set("view engine", "ejs")


// //ROUTES
// app.get("/", (req, res) =>{
//     res.send("hiya")
// })

// //Index view:
// //this url: localhost:8000/dinosaurs
// app.get("/dinosaurs", (req, res) => {
//     let dinos = fs.readFileSync("dinosaurs.json")
//     //the below takes the data and returns a more readable format
//     dinos = JSON.parse(dinos)
//     console.log(req.query.nameFilter)
//     let nameToFilterBy = req.query.nameFilter
//     //array method filter
//     const newFilteredArray = dinos.filter((dinosaurObj) => {
//         if (dinosaurObj.name === nameToFilterBy) {
//             return true
//         }
//     })
//     //res.render already knows to look in the views folder
//     res.render("dinosaurs/index", {dinos: dinos})
// })

// //SHOW View
// app.get("/dinsosaurs/:index", (req, res) => {
//     let dinos = fs.readFileSync("dinosaurs.json")
//     //the below takes the data and returns a more readable format
//     dinos = JSON.parse(dinos)
//     //get the dino that's asked for
//     //req.params.index
//     const dino = dinos[req.params.index]
//     res.render("dinosaurs/show", { dino })
// })

// //New view
// app.get("/dinosaurs/new", (req, res) => {
//     res.render("dinosaurs/new")
// })

// //POST route; doesn't have a view
// //POST is used to create something
// app.post('/dinosaurs', (req, res)=> {
//     // this is coming from our form submit
//     // we are going to look at the req.body
//     let dinos = fs.readFileSync("./dinosaurs.json")
//     //the below takes the data and returns a more readable format
//     dinos = JSON.parse(dinos)
//     //construct a new dino with our req.body values
//     const newDino = {
//         name: req.body.name,
//         type: req.body.type
//     }
//     dinos.push(newDino)
//     fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinos))
//     //JSON.strignfy turns dinos into easy readable text
//     console.log(req.body)

// })



// const PORT = process.env.PORT || 8000
// app.listen(PORT, () => {
//     console.log(`server is running on ${PORT}`)
// })


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require("method-override")

// MiddleWare
//pass middleware to app.use so its accessible 
// this will help us use our layout file
app.use(expressLayouts)
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"))


// for views use .ejs files
app.set('view engine', 'ejs')

// ROUTES
app.get('/', (req, res)=> {
    res.send('Hi there')
})

// Index View
// this url: localhost:8000/dinosaurs
app.get('/dinosaurs', (req, res)=> {
    let dinos = fs.readFileSync('./dinosaurs.json')
    // take our data and put it in a more readable format
    dinos = JSON.parse(dinos)
    console.log(req.query.nameFilter)
    let nameToFilterBy = req.query.nameFilter
    // array method filter
    console.log(nameToFilterBy)
    
    // if there is no submit of the form
    // this will be undefined, and we will returnb all dinos
    if (nameToFilterBy) {
        const newFilteredArray = dinos.filter((dinosaurObj) => {
            if (dinosaurObj.name.toLowerCase() === nameToFilterBy.toLowerCase()) {
                return true
            }
        })
        dinos = newFilteredArray
    }
    // console.log(dinos)
    // in our views folder render this page
    res.render('dinosaurs/index', {dinos: dinos} )
})

// NEW View
// Most specific to least specific url path
app.get('/dinosaurs/new', (req, res)=> {
    res.render('dinosaurs/new')
  })

// SHOW View
app.get('/dinosaurs/:index', (req, res)=> {
    let dinos = fs.readFileSync('./dinosaurs.json')
    // take our data and put it in a more readable format
    dinos = JSON.parse(dinos)
    // get the dino that's asked for
    // req.params.index
    const dino = dinos[req.params.index]
    res.render('dinosaurs/show', { dino })
})


// POST route, doesn't have a view
app.post('/dinosaurs', (req, res)=> {
    let dinos = fs.readFileSync('./dinosaurs.json')
    // take our data and put it in a more readable format
    dinos = JSON.parse(dinos)
    // construct a new dino with our req.body values
    const newDino = {
        name: req.body.name,
        type: req.body.type
    }
    // updates dinos with new dino
    dinos.push(newDino)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos))

    let lastIndex  = dinos.length -1
    // get a request to /dinosaurs
    res.redirect(`/dinosaurs/${lastIndex}`)
    // this is coming from our form submit
    // we are going to look at the req.body
    // console.log(req.body)
})

//Delete something in the .json file
app.delete("/dinosaurs/:idx", (req, res) => {
    const dinosaurs = fs.readFileSync("./dinosaurs.json") //why do we need the ./
    const dinosaursArray = JSON.parse(dinosaurs)

    // intermediate variable 
    let idx = req.params.idx;
    // idx(and anything from the browser) comes in as a string
    // change the string to a number so you can use it as the index to access the array 
    idx = Number(req.params.idx)
    //remove a dinosaur from the array
    dinosaursArray.splice(idx, 1)
    // save the manipulated dinosaurs array into the dinosaurs.json file
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinosaursArray))
    //JSON.stringify(dinosaursArray) turns the array back to json format 
    //so it can replace the current content thats in the file.

    //redirect back to /dinosaurs route
    res.redirect("/dinosaurs")
})


const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})