const { argv } = require('yargs');
const yargs = require('yargs');
yargs.version('1.1.0');

const myNotes = require('./notes');

yargs.command({
  command: 'add',
  describe: 'Add a note.',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Add the note.',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => myNotes.addNotes(argv.title, argv.body),
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note.',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => myNotes.removeNotes(argv.title),
});

yargs.command({
  command: 'list',
  describe: 'List the notes.',
  handler: () => {
    console.log('Listing the notes...');
  },
});

yargs.command({
  command: 'read',
  describe: 'Read a note.',
  handler: () => {
    console.log('Reading a note...');
  },
});

yargs.parse();
