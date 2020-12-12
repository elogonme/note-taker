import { nanoid } from 'nanoid';

class Note {
    constructor (title, text) {
        this.id = nanoid(),
        this.title = title,
        this.text = text
    }
}

module.exports = Note;