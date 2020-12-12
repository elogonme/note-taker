// Dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');
const Note = require('./lib/note');

// Set up Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = []; // Array to store notes

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => {
    notes = readDB();
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    notes = readDB();
    const newNote = new Note(req.body.title, req.body.text);
    notes.push(newNote);
    if (saveDB(notes)) {
        res.status(201).json(newNote);
        console.log('Added new Note:', newNote)
    } else {
        res.status(500).send('Could not add Note'); // If file was not able to be saved return error
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    notes = readDB();
    const indexOfNote = notes.findIndex(note => note.id = id);
    if (indexOfNote !== -1) {
        console.log('Deleted Note: ', notes[indexOfNote]);
        notes.splice(indexOfNote, 1);
        saveDB(notes);
        res.sendStatus(204);
    } else {
        res.status(404).send();
    }
});
// This is the home page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () => {
    console.log(`Notes Server is listening on ${PORT}`)
});

// Helper functions
const readDB = () => {
    try { 
        const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json'), {encoding:'utf8'})); 
        console.log("Successfully read notes from db.js ..."); 
        console.log(notes);
        return notes;
      } catch(err) { 
        console.error(err); 
      } 
}


const saveDB = (notes) => {
    try { 
        fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(notes));
        console.log("Successfully saved notes to db.js ..."); 
        return true;
      } catch(err) { 
        console.error(err);
      } 
    return false;
}
