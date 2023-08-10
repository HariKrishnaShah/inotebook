const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../modules/Note');
const Note = require('../modules/Note');

//Route 1 fetch all notes using get through /api/notes/fetchallnotes Login required
router.get('/fetchallnotes', fetchuser, async(req, res)=>{
    try{
        const notes = await Notes.find({user:req.user.id});
    res.json(notes);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");}
})
//Route 2 add new note using POST method.  through /api/notes/addnote Login required
router.post('/addnote', fetchuser,
    body('title', "Title's length should be atleast 3 ").isLength({min:3}),
    body('description', "Description's length should be atleast 4 ").isLength({min:4}), async(req, res)=>{
        try
        {
            const {title, description, tag,} = req.body;
            const result = validationResult(req); 
            if (!result.isEmpty()) {
          
                return res.status(400).json({errors:result.array()});
              }
               const note = new Notes({title, description, tag, user:req.user.id });
               const savednote = await note.save();   
               res.json(savednote);
        }
        catch(error){
            console.log(error.message);
         res.status(500).send("Internal Server Error Occured");}
})

//Route 3 Update an existing note using PUT method  through /api/notes/updatenote Login Required
router.put('/updatenote/:id', fetchuser, async(req, res)=>{
    try{
        const {title, description, tag} = req.body;
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated and update it.
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};

        //Not allow user to update other user's note
        if(note.user.toString()!=req.user.id)
        {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json(note);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");}
})

//Route 4 Delete an existing note using DELETE method through /api/notes/deletenote Login Required
router.delete('/deletenote/:id', fetchuser, async(req, res)=>{
    try{
        //Find the note to be deleted and delete it.
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};

        //Not allow user to delete other user's note
        if(note.user.toString()!=req.user.id)
        {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.send("Note deleted sucessfully.")
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error Occured");}
})


module.exports = router;