const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter(note => note.title === title);
  const duplicateNote = notes.find(note => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  } //end of ifelse
}; //end of addNote

const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.bgGreen("Note removed successfully!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.bgRed("No matching notes found!"));
  }
}; // end of removeNote

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your Notes"));
  notes.forEach(note => {
    console.log(note.title);
  });
}; //end of listNote

const readNote = title => {
  const notes = loadNotes();
  console.log(chalk.bold.green("Reading your notes!"));
  const noteToRead = notes.find(note => note.title === title);

  if (noteToRead) {
    console.log(chalk.green(noteToRead.title));
    console.log(noteToRead.body);
  } else {
    console.log(chalk.red.bold("This note is not available!"));
  }
}; //end of readNote

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
