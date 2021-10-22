import express from "express";
import {getAllUsers, addUser, getParticularUser, deleteUser, updateUserWithPATCH, updateUserWithPUT} from "../controllers/users.js" // filename should have .js extension

// all routes in here are starting with /users
const router = express.Router();

   
// Getting all the user's info using the GET request
router.get("/", getAllUsers);

// Posting an user info using the POST request
router.post("/", addUser);

// Getting a particular user info through the unique id
// :id means there we can put anything but only id would mean id in literal sense which we don't want
router.get("/:id", getParticularUser);

// Deleting a particular user with the given id with the DELETE request
router.delete("/:id", deleteUser);

// Updating a particular info of a user with the given id with the PATCH request
// difference between PUT and PATCH request
/*
    PUT completely overwrites or changes everything
    PATCH updates certain info as provided and does not overwrite
*/

/*
why does updating info in user the object updates the users array in PATCH request???
Because it's an array of Objects (not primitives), the returned value will be a reference
to the original object, so modifying a property of the returned object, 
will update the property of the object that it is referencing.
-- Reference: https://stackoverflow.com/questions/24304383/javascript-return-reference-to-array-item 
*/
router.patch("/:id", updateUserWithPATCH);

// Overwriting information about an user with the given id with the PUT request
router.put("/:id", updateUserWithPUT);


export default router;

/*
Whenever you are saving the file users.js then nodemon is restarting the server 
then users array becomes an empty array
*/