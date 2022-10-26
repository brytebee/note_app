const fs = require('fs');
const chalk = require('chalk');

const chalkError = chalk.bold.red;
const chalkSuccess = chalk.bold.green;

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

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(
    (note) => normalize(note.title) === normalize(title)
  );
  if (duplicateNotes.length === 0) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalkSuccess('Note added!'));
  } else {
    console.log(chalkError('Note title taken!'));
  }
};

const removeNotes = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter(
    (note) => normalize(note.title) !== normalize(title)
  );
  notes.length === filteredNotes.length
    ? console.log(chalkError('No note match!'))
    : console.log(chalkSuccess('Note removed!'));
  saveNotes(filteredNotes);
};

module.exports = { getNotes, addNotes, removeNotes };
