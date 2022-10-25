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

const normalize = (input) => input.toLowerCase();

const addNotes = function (title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(
    (note) => normalize(note.title) === normalize(title)
  );
  if (duplicateNotes.length === 0) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log('Note added!');
  } else {
    console.log('Note title taken!');
  }
};

const removeNotes = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter(
    (note) => normalize(note.title) !== normalize(title)
  );
  saveNotes(filteredNotes);
};

module.exports = { getNotes, addNotes, removeNotes };
