const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const fs = require("fs")

//MiddleWare
//this will help us use our layout file
//use is a method in express 
app.use(expressLayouts)

app.set("view engine", "ejs")


//ROUTES
app.get("/", (req, res) =>{
    res.send("hiya")
})

//Index view:
app.get("/dinosaurs", (req, res) => {
    let dinos = fs.readFileSync("dinosaurs.json")
    //the below takes the data and returns a more readable format
    dinos = JSON.parse(dinos)
    console.log(dinos)
    //res.render already knows to look in the views folder
    res.render("dinosaurs/index", {dinos: dinos})
})

//SHOW View
app.get("/dinsosaurs/:index", (req, res) => {
    let dinos = fs.readFileSync("dinosaurs.json")
    //the below takes the data and returns a more readable format
    dinos = JSON.parse(dinos)
    //get the dino that's asked for
    //req.params.index
    const dino = dinos[req.params.index]
    res.render("dinosaurs/show", { dino })
})

//New view
app.get("/dinosaurs/new", (req, res) => {
    res.render("dinosaurs/new")
})

//POST route; doesn't have a view
//POST is used to create something
app.post('/dinosaurs', (req, res)=> {
    // this is coming from our form submit
    // we are going to look at the req.body
    let dinos = fs.readFileSync("./dinosaurs.json")
    //the below takes the data and returns a more readable format
    dinos = JSON.parse(dinos)
    //construct a new dino with our req.body values
    const newDino = {
        name: req.body.name,
        type: req.body.type
    }
    dinos.push(newDino)
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinos))
    //JSON.strignfy turns dinos into easy readable text
    console.log(req.body)

})



const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

//app.listen(8000)