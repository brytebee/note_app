const fs = require('fs');
const chalk = require('chalk');

const chalkError = chalk.bold.red;
const chalkSuccess = chalk.bold.green;

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
  const duplicateNote = notes.find(
    (note) => normalize(note.title) === normalize(title)
  );
  if (!duplicateNote) {
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

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length) {
    console.log(chalk.bold.blue('Your Notes'));
    notes.forEach((note, i) => console.log(`${i + 1} --- ${note.title}`));
  } else {
    console.log(chalk.bold.blue('No note yet. Add some notes!'));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const yourNote = notes.find(
    (note) => normalize(note.title) === normalize(title)
  );
  if (yourNote) {
    console.log(chalk.bold.blue(yourNote.title));
    console.log(chalk.inverse(yourNote.body));
  } else {
    console.log(chalkError('Note not found!'));
  }
};

module.exports = { addNotes, removeNotes, listNotes, readNote };
