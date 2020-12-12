const { nanoid } = require('nanoid') // Nanoid npm package to generate unique IDs
// Note Class contructor to be used for each new note.
class Note {
    constructor (title, text) {
        this.id = nanoid(), // id will be generated on the fly when new note created.
        this.title = title,
        this.text = text
    }
}

module.exports = Note;
