
const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var items=[];
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


app.post("/",function(req, res){
  input=req.body.newItem;

  if (req.body.list==="serverRestart"){
    items=[];
    res.redirect("/");
  } else{
    items.push(input);
    res.redirect("/");
  }

});

app.listen(process.env.PORT || 3000, function(){
  console.log("server is up and running");
});
