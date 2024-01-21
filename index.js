const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const port = 8080;
app.use(express.urlencoded({ extended : true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));

let posts = [
    {
        id : uuidv4(),
        username : "shanumi07",
        content : "I love coding and making money."
    },
    {
        id : uuidv4(),
        username : "shanumishra70",
        content : "Hardwork is important to achieve success."
    },
    {
        id : uuidv4(),
        username : "simplyshanu19",
        content : "I finally got a job with good salary and perks."
    },
];
app.get("/posts", (req,res) => {
    res.render("index.ejs", { posts });
});
app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});
app.post("/posts", (req,res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    // res.send("POST request working.");
    res.redirect("/posts");
    console.log(req.body);
});
app.get("/posts/:id", (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});
app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
