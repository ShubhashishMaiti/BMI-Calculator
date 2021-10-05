const  express = require ("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require ("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
 res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;
  const phonenumber=req.body.phone;
  const data={
    members:[
      {
        email_address: email,
        status:"subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          PHONE: phonenumber

        }
      }
    ]
  };
  // the mailchimp server want that we should send the data in jso format
  const jsonData = JSON.stringify(data);
  const url="https://us6.api.mailchimp.com/3.0/lists/4482bb6610";
  const  options = {
       method: "POST",
       auth:"shubhashish:a67b86e9cd5b2a0b2f8a29c0544a2271-us6"

  }
  const request = https.request(url,options, function(response){
    if(response.statusCode ===200) {
      res.sendFile(__dirname+"/success.html");
    }
    else
    {
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  } )

  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(req,res){
  console.log("Server is running on port 3000");
});




// a67b86e9cd5b2a0b2f8a29c0544a2271-us6

// list id
// 4482bb6610
