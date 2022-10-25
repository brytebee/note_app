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
  handler: function (argv) {
    myNotes.addNotes(argv.title, argv.body);
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note.',
  handler: () => {
    console.log('Removing a note...');
  },
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
  handler: function () {
    console.log('Reading a note...');
  },
});

yargs.parse();
