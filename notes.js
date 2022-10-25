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

const addNotes = function (title, body) {
  const notes = loadNotes();
  notes.push({ title, body });
  fs.writeFileSync('notes.json', notes);
};

module.exports = { getNotes, addNotes };
