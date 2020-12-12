// Helper functions
const fs = require('fs');
const path = require('path');
// Read db.js file, parse and return notes array
const readDB = () => {
    try { 
        const notes = JSON.parse(fs.readFileSync(path.join('./', 'db/db.json'), {encoding:'utf8'})); 
        return notes;
      } catch(err) { 
        console.error(err); 
      } 
}
// Save db.js with notes in JSON and return true or false if successfull or not
const saveDB = (notes) => {
    try { 
        fs.writeFileSync(path.join('./', 'db/db.json'), JSON.stringify(notes));
        return true;
      } catch(err) { 
        console.error(err);
      } 
    return false;
}

module.exports = {
    readDB,
    saveDB
}