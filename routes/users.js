import express from "express";
import {v4 as uuidv4} from "uuid";

// all routes in here are starting with /users
const router = express.Router();
let users = [];


   
// Getting all the user's info using the GET request
router.get("/", (req, res) => {
    if(users.length === 0) res.send("User list is empty.");
    else res.send(users);
});

// Posting an user info using the POST request
router.post("/", (req, res) => {
    users.push({...req.body, id:uuidv4()});  // adding a new key called id
    res.send(`New user ${req.body.firstName} added to the list.`);
});

// Getting a particular user info through the unique id
// :id means there we can put anything but only id would mean id in literal sense which we don't want
router.get("/:id", (req, res) => {
    const user = users.find(ele => ele.id === req.params.id);
    if(!user) res.send(`No user with id ${req.params.id} exists in the list.`);
    else res.send(user);
});

// Deleting a particular user with the given id with the DELETE request
router.delete("/:id", (req, res) => {
    const user = users.find(ele => ele.id === req.params.id);
    if(!user) res.send(`No user with id ${req.params.id} exists in the list.`);
    else{
        users = users.filter(ele=> ele !== user);
        res.send(`User ${user.firstName} was deleted from the list.`);
    }    
});

// Updating a particular info of a user with the given id with the PATCH request
// difference between PUT and PATCH request
/*
    PUT completely overwrites or changes everything
    PATCH updates certain info as provided and does not overwrite
*/
router.patch("/:id", (req, res) => {
    const user = users.find(ele => ele.id === req.params.id);
    if(!user) res.send(`No user with id ${req.params.id} exists in the list.`);
    else{
        const index = users.indexOf(user);
        const {firstName, lastName, age} = req.body;
        if(firstName) user.firstName = firstName;
        if(lastName) user.lastName = lastName;
        if(age) user.age = age;
        users[index] = user;
        res.send(`User with id ${req.params.id} information updated.`);
    }    
});


export default router;