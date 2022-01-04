const router = require('express').Router();

const store = require('../db/store.js');

/*Get Notes Route Function:
This first route gets all existing notes from the database by calling the getNotes() method.
If there are no notes to get it returns as an empty array.  
*/
router.get('/notes', (req, res) => {
    store
        .getNotes()
        .then(notes => {
            res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


/*Post Notes Route Function:
This second route posts new note data to the server.  Console.log(req) is used to 
print out any input passed in as part of the request's body (the req object).
This console log is used so that if the user has an issue with adding or deleting notes 
they can just check the console logs to see what the issue is.  Otherwise the user would
just recieve an standard error message but not have any information on what exactly happened.  
*/

router.post('/notes', (req, res) => {
    console.log(req.body)
    store
        .addNote(req.body)
        .then(note => {
            res.json(note)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

/*Delete Notes Route Function:
The third route called /notes/:id deletes notes based on their ID value which is passed into
this function's URL parameter (req).
*/

router.delete('/notes/:id', (req, res) => {
    store
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
})

module.exports = router;



