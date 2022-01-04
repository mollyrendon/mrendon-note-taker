const util = require('util');
const fs = require('fs');
const uuid = require('uuid').v1;

/*File Async:
The readFileAsync is a function that reads the contents of the file.
The writeFileAsync is a function to write the contents of the file.  This code uses promises, which
are objects that represent future value.  The promis will resolve when either the readFile or the 
writeFile is completed successfully.  This means the the code can read and write files at the same
time.
*/

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


/*Store Class:
This new class called Store has a read() and a write() method.  The read method returns an asynchronous function that takes in a path to a file,
which is the db/db.json file and the encoding type of utf8 as arguments.  The write method also takes in an argument, note, which is passed through JSON
stringify before being written to the db/db.json file.  

The addNote method adds a new note to the database while returning all notes from the database expect for the  newly added note.
This repeats until there are no more notes left or if there was an error, like no title/text given.  After all of the notes have been
removed or updated the method will return another note object with the id set to uuid().
*/
class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8')
    }
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note))
    }

    addNote(note) {
        const {title, text} = note

        if(!title || !text) {
            throw new Error('You need to add a title and a task.')
        }
        const newNote = {title, text, id: uuid()}

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => this.newNote)
    }

    getNotes() {
        return this.read()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }

    removeNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !==id))
            .then(keptNotes => this.write(keptNotes))
    }
}


module.exports = new Store();