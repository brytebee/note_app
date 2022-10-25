const fs = require('fs');

const getNotes = function () {
  return 'Your notes...';
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const addNotes = function (title, body) {
  const notes = loadNotes();
  notes.push({ title, body });
  saveNotes(notes);
};

const removeNotes = (title) => {
  const notes = loadNotes();
  notes.filter(function (note) {
    note.title !== title;
  });
  saveNotes(notes);
};

module.exports = { getNotes, addNotes, removeNotes };
