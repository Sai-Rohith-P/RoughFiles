const express = require('express');
const path = require('path')
const app = express()
var Users = require('./Users');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/',Users);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})





app.listen(3000, () => {
    console.log("Server is Running......");

})



// app.get('/users',(req,res)=>{
//     let username = `
//     <h2>User List</h2>
//     <ul>
//         ${users.map(user =>`<li>Username : ${user.UserName}, Password : ${user.Password}</li>`).join('')}
//     </ul>
//     `
//     res.send(username);
// })