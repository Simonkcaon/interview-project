const express = require ("express")
const req = require("express/lib/request")
const mongoose = require ("mongoose")
const UrlShort = require ("./public/models/urlShort")
const app = express()


//Set up DB connection
mongoose.connect("mongodb://localhost/urlshort", {
    useNewUrlParser: true, useUnifiedTopology: true}
    );

//Set view engine
app.set("views", "./public/views");
app.set( "view engine", "ejs")

//Set Port 
app.listen(process.env.PORT || 4040 ); 
 
//Use of URL Paramaters 
app.use(express.urlencoded({ extended: false}))

app.use(express.static('public'));

//Set Homepage
app.get ("/", async (req, res) =>  {
    const urlShort = await UrlShort.find()
    res.render("./index", {urlShort: urlShort})
})

//Render result Page
app.get("/result", async(req, res) => {
    isLong = await UrlShort.findOne({long: isURL});
    res.render("result", isLong)
})

app.get("/stats", async(req, res) => {
    isLong = await UrlShort.findOne({long: isURL});
    res.render("stats", isLong)
})

//Handle URl Form shorten button
app.post("/urlShort", async(req, res) => {

    //check if URL already exists in DB
    isURL = await req.body.longURL;
    isLong = await UrlShort.findOne({long: req.body.longURL});

    //if not, create new one and redirect to /result
    if (isLong == null) {
    isLong = await UrlShort.create({long: req.body.longURL})
    res.redirect("/result")
    }
    //if yes, increment the short counter and redirect to /result
    else { 
    isLong.shortCount++
    await isLong.save();
    res.redirect("/result")
    }
})

//handle url form stats button
app.post("/urlStats", async(req, res) => {

    //check if URL already exists in DB
    isURL = await req.body.longURL;
    isLong = await UrlShort.findOne({long: req.body.longURL});

    //if not, create new one and redirect to /result
    if (isLong == null) {
    res.redirect("/")
    }
    else {
    res.redirect("/stats")
    }
})

app.get("/:urlShort", async (req, res) => {

    //check if the url exists in DB 
    const urlShort = await UrlShort.findOne({ short: req.params.urlShort })

    //if not post error
    if (urlShort == null) return res.sendStatus(404)
  
    //if yes redirect to long url and increment counter by one
    urlShort.accessCount++
    urlShort.save()
    res.redirect(urlShort.long)
  })


