const path = require('path');

const router = require('express').Router();

/*Send Notes Route:
The first route uses the sendFile() method of res object which send notes.html file
from the public folder if there is a request going through this route.
*/

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

/*Send Homepage Route:
This second route is for all other requests, requests with no file extension.  It sends users back to
the homepage, the index.html in the public folder.  It does this instead of sending nothing at all because there might be 
some errors in routing.  
*/

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router;