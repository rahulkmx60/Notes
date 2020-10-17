// ***************** IMPORTS *****************//
const notes = require('./notes.js');
const yargs = require('yargs');
/////////////////= IMPORTS DONE =/////////////////


// ***************** COMMANDS *****************//
var title = {
    describe : 'Title of note starting with -t',
    demand : true,
    alias : 't'  
}; // an object title to reuse in command

var body = {
    describe : 'Body or description of the note starting with -b',
    demand : true,
    alias : 'b'
}; // an object body to reuse in command

const argv = yargs
    .command('add', 'Add a new note', {
        title,
        body,
    }
    )
    .command('list', 'List all notes')
    .command('read', 'Read a note',{
   title
    })
    .command('remove', 'Remove a note', {
        title       
    })
    .help()
    .argv;

var command = process.argv[2];
console.log(`You choose ${command} command`);
/////////////////= COMMANDS DONE =/////////////////



// ***************** FUNCTIONS *****************//
// to add a note in our file
if(command === 'add'){
var note = notes.addNote(argv.title, argv.body);
if (note){

    console.log("Note created");
    console.log(`Title : ${note.title}`);
    console.log(`Body : ${note.body}`);
}
else{
    console.log("Note already exsist");
}
}
// to list all the notes with their title
else if(command === 'list'){
    var listingNotes = notes.getAll();
    console.log(`Printing ${listingNotes.length} note(s)`);
    listingNotes.forEach ((note) => {
       notes.logNote(note);
    });
}
// to read a particular note and displaying it on shell
else if(command === 'read'){
    var noteRead = notes.readNote(argv.title);
    if(noteRead){ 
    console.log(`Note found with Title : ${noteRead.title}`);
    console.log(`Body : ${noteRead.body}`);
}
else {
    console.log(`Not found any note with Title : ${argv.title}`);
}}

// to delete the item from list or send not found message in case given note not found
else if(command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found'
    console.log(message);
}

else  // display if no command is selcted or recognized
console.log('Command not recognised');
/////////////////= FUNCTION DONE =/////////////////
