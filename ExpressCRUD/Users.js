const express = require('express');
const path = require('path');
let router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended:true}))
router.use(express.static(path.join(__dirname,'public')));
let users = [
    {
        id: 1,
        UserName: "Rohith Sai",
        Password: "Rohii"
    }, {
        id: 2,
        UserName: "Dhana Sai",
        Password: "Dhana"
    }
]

router.post('/users', (req, res) => {
    let newUsername = req.body.username;
    let newUserpassword = req.body.password;
    users.push({ id: users[users.length - 1].id + 1, UserName: newUsername, Password: newUserpassword })
    let username = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users</title>
    
    <link rel="stylesheet" href="/style.css">
</head>

<body>
    <div class="users">
        <h2>User List</h2>
        <div class="user-list">
            <ul>
                 ${users.map(user => `<li><div class="ids"><span>ID</span> : ${user.id}</div><div><span>User name</span> : ${user.UserName}</div> <div class="password"><span>password</span> : ${user.Password}</div></li>`).join('')}
            </ul>
        </div>
    </div>
    <form class="delete" action="/users/new-user-List" method="POST">
        <input type="text" name="num" placeholder="User ID to delete">
        <button type="submit">Delete User</button>
    </form>
</body>

</html>
    `
    res.send(username);

})

router.get('/users', (req, res) => {
    let username = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users</title>
    <link rel="stylesheet" href="/style.css">
</head>

<body>
    <div class="users">
        <h2>User List</h2>
        <div class="user-list">
            <ul>
                 ${users.map(user => `<li><div class="ids"><span>ID</span> : ${user.id}</div><div><span>User name</span> : ${user.UserName}</div> <div class="password"><span>password</span> : ${user.Password}</div></li>`).join('')}
            </ul>
        </div>
    </div>
    <form class="delete" action="/users/new-user-List" method="POST">
        <input type="text" name="num" placeholder="User ID to delete">
        <button type="submit">Delete User</button>
    </form>
</body>

</html>
    `
    res.send(username);
})

router.post('/users/new-user-List',(req,res)=>{
    const id= parseInt(req.body.num);
    
    users = users.filter(user => user.id !== id);
    if (users.length === 0) {
        return res.send(`<center><h2>No user found with ID: ${id}</h2></center>`);
    }
    let username = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users</title>
        <link rel="stylesheet" href="/style.css">
</head>

<body>
    <div class="users">
        <h2>User List</h2>
        <div class="user-list">
            <ul>
                ${users.map(user=>`<li><div class="ids"><span>ID</span> : ${user.id}</div><div><span>User name</span> : ${user.UserName}</div> <div class="password"><span>password</span> : ${user.Password}</div></li>`).join('')}
            </ul>
        </div>
    </div>
    <form class="delete" action="/users/new-user-List" method="POST">
        <input type="text" name="num" placeholder="User ID to delete">
        <button type="submit">Delete User</button>
    </form>
</body>

</html>
    `
    res.send(username);
})
module.exports = router;