import {v4 as uuidv4} from "uuid";  // for getting an unique id for each user

let users = [];

export const getAllUsers = (req, res) => {
    if(users.length === 0) res.send("User list is empty.");
    else res.send(users);
};

export const addUser = (req, res) => {
    users.push({...req.body, id:uuidv4()});  // adding a new key called id
    res.send(`New user ${req.body.firstName} added to the list.`);
};

export const getParticularUser = (req, res) => {
    const user = users.find(ele => ele.id === req.params.id);
    if(!user) res.send(`No user with id ${req.params.id} exists in the list.`);
    else res.send(user);
};

export const deleteUser = (req, res) => {
    const user = users.find(ele => ele.id === req.params.id);
    if(!user) res.send(`No user with id ${req.params.id} exists in the list.`);
    else{
        users = users.filter(ele=> ele !== user);
        res.send(`User ${user.firstName} was deleted from the list.`);
    }    
};

export const updateUserWithPATCH = (req, res) => {
    const user = users.find(ele => ele.id === req.params.id);
    if(!user) res.send(`No user with id ${req.params.id} exists in the list.`);
    else{
        const {firstName, lastName, age} = req.body;
        if(firstName) user.firstName = firstName;
        if(lastName) user.lastName = lastName;
        if(age) user.age = age;
        res.send(`User with id ${req.params.id} information updated.`);
    }    
};

export const updateUserWithPUT = (req, res) => {
    const id = req.params.id;
    let index = users.findIndex(ele => ele.id === id);
    if(index === -1) res.send(`No user with id ${id} exists in the list.`);
    else{
        users[index] = {...req.body, id};
        res.send(`User with id ${id} information updated.`);
    }   
};

