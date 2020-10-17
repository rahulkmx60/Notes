// ***************** IMPORTS *****************//
const fs = require('fs');
const dotenv = require('dotenv').config();
/////////////////= IMPORTS DONE =/////////////////

// *************** QUINESSENTIAL ***************//
var fetchNotes = () => { // TO READ DATA FROM JSON
	try{
		var noteString = fs.readFileSync(process.env.DB);
		return JSON.parse(noteString);	
		}

	catch(e)
		{
				return [];
		}
}

var saveNotes = (notes) =>{ // TO SAVE A NOTE
	fs.writeFileSync('node-data.json', JSON.stringify(notes));
}
//////////////= QUINESSENTIAL DONE =///////////////



// ***************** FUNCTIONS *****************//

// TO ADD NOTES IN LIST
var addNote = (title, body) =>{
var notes = fetchNotes();
var note = {
	title,
	body
}

var duplicateNotes = notes.filter((note)=>note.title === title);
// duplicateNotes is a filtered array

if( duplicateNotes.length === 0){

notes.push(note);
saveNotes(notes);
return note;
}

};

// TO LIST ALL NOTES
var getAll = () =>{
	return fetchNotes();
}
var readNote = (title) =>{
	var notes = fetchNotes();
	var newNote =  notes.filter((note) => note.title === title);
	return newNote[0];
}

// TO REMOVE NOTES
var removeNote = (title) =>{
var notes = fetchNotes();
var fetchedNotes = notes.filter((note) => note.title !== title );
saveNotes(fetchedNotes);
return notes.length !== fetchedNotes.length; 
};

// TO LIST ALL NOTES
var logNote = (note) => {
	console.log(" ");
	console.log(`Title : ${note.title}`);
	console.log(`Body : ${note.body}`);
	console.log(" ");
};
/////////////////= FUNCTION DONE =/////////////////




// ***************** EXPORTS *****************//
module.exports = {
	addNote,
	getAll,
	readNote,
	removeNote,
	logNote,
};
/////////////////= EXPORTS DONE =/////////////////