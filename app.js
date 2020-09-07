
const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var items=["Buy Food", "Cook Food", "Eat Food"];
var input;
var workItems=[];

app.get("/",function(req, res){

  var today=new Date();
  var options ={
    day: "numeric",
    weekday: "long",
    month: "long"
  }
  var currentDay=today.toLocaleDateString("en-US", options);
  res.render('list', {listTitle: currentDay, newitem: items});
});

app.get("/work", function(req, res){
  res.render('list', {listTitle: "Work List", newitem: workItems});
});

app.post("/",function(req, res){
  input=req.body.newItem;

  if (req.body.list==="Work List"){
    workItems.push(input);
    res.redirect("/work");
  } else{
    items.push(input);
    res.redirect("/"); //once you press +, then the array is updated and the get request is initiated again
  }

  //redirecting because rendering in app.post will create problems in list.ejs when a GET request is initaited
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server is up and running");
});
