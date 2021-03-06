const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require("../mongoose_models/Notes")
const { body, validationResult } = require('express-validator');


//ROUTE 1: Get all the notes using : GET by endpoint "/api/auth/fetchallnotes". login required
router.get('/fetchallnotes',fetchUser,async(req,res)=>{
    try {
        //get all the notes of the user by id
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

//ROUTE 2: Add a new note using POST by endpoint "/api/auth/addnote". login required
router.post('/addnote',fetchUser,[
    body("title","Enter a valid title").isLength({min:3}),
    body('description','Description must be of min 5 character').isLength({ min: 5 }),
],async(req,res)=>{
    try {
        //if error , send bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const {title,description,tag} = req.body;
        const note = new Notes({
            title,description,tag,user:req.user.id 
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router