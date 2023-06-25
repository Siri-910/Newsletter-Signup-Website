const express =require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =require("https");
const app =express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({encoded:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data =
     {
        members:[
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }


        ]
     };
     const jsonData = JSON.stringify(data);
     const url="https://us21.api.mailchimp.com/3.0/lists/eab3373534";
     const options ={
        method: "POST",
        auth: "siri:1f830b4239aee36863b8bec4bf058559-us21"
     }
     
     
     
     const request=https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");

        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })




     })

     request.write(jsonData);
     request.end();

});

app.post("/failure",function(req,res)
{
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function()
{
    console.log("Server is runnin on port 3000");
});



// 0e55cbd8944825bab4054a4b4bddc8ef-us21
// eab3373534
// 1f830b4239aee36863b8bec4bf058559-us21