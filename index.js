// import dependencies
const express = require('express');
const colors = require('colors');
const shortid = require('shortid');
const cors = require('cors');

// create server and port
const server = express();
const PORT = 8501;

// let express read json
server.use(express.json());
server.use(cors());

// server initialization
server.listen(PORT, () => {
    console.log('\n == SERVER IS LISTENING ON PORT 8501 == \n'.magenta.bold)
});
// set initial users
let users = [
    {
        id: shortid(),
        name:"Marc",
        bio: "web dev"
    },
    {
        id: 2,
        name: "Michael",
        bio: "web dev"
    }
]

// GET (/) verify api is up

server.get('/', (req, res) => {
    res.json({
        api: "API is up and running"
    })
});

// GET (/api/users) get all users --return array of users

server.get("/api/users", (req, res) => {
    if (!users){
        res.status(500).json({
            errorMessage: "The users information could not be retrieved"
        })
    }else{
    res.status(200).json(users);
    }
})

// POST (/api/users) add new user -- return array of users with new user
server.post('/api/users', (req, res) => {
    const indUser = {
        id: shortid.generate(),
        name: req.body.name,
        bio: req.body.bio
    }
    // console.log(indUser)
    try{
    if(typeof indUser.name !== 'string') {
        res.status(400).json({
            errorMessage:"Please provide name for the user"
        })
    }else if(typeof indUser.bio !== 'string'){
        res.status(400).json({
            errorMessage: "Please provide a bio for the user"
        })
    }else{
        users.push(indUser)
        res.status(201).json({
            data: indUser,
            users: users
        })
    }} catch(err){
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database"
        })
    }
})


// GET (/api/users/:id) return specific user
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.filter(user => user.id == id);
    try{if(user.length === 0){res.status(404).json({
        errorMessage: "the user with the specified id does not exist"
    })
}else{
    res.status(200).json(user)
}}catch(err){
    res.status(500).json({
        errorMessage: "the user information could not be retrieved"
    })
}
})

// DELETE (/api/users/:id) delete specific user and returns deleted user

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const delUser = users.filter(user => user.id == id);
    users = users.filter(user => user.id != id);
    try{if(delUser.length === 0){res.status(404).json({
        errorMessage: "the user with the specified ID does not exist"
    })}else{
        res.status(200).json({
            deleted_user: delUser,
            users: users
        })
    }}catch(err){
        res.status(500).json({
            errorMessage: "the user could not be removed"
        })
    }

})

// PATCH I THINK YOU MEAN PUT (/api/users/:id) updates user and returns modified user

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const indUser = req.body;
    const updUser = users.filter(user => user.id == id);
    users = users.filter(user => user.id != id);
    try{if (typeof indUser.name!== "string" || typeof indUser.bio !== "string"){
        let error = true;
        res.status(400).json({
            errorMessage: "Please include the users name and bio in your request"
        })
    }else if(updUser.length === 0){
        let error = true;
        res.status(404).json({
            errorMessage: "the user with the specified id does not exist"
        })
    }else{
        const updatedUser = {
            id: id,
            name: indUser.name,
            bio: indUser.bio
        }
        users.push(updatedUser);
        res.status(200).json({
            updated_user: updatedUser,
            users
        })
    }}catch(err){
        res.status(500).json({
            errorMessage: "Could not update user information"
        })
    }


})