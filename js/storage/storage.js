/* 
   Saves a value into localStorage after turning it into text
*/
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/* 
   Loads a value from localStorage and turns it back into normal JavaScript data
*/
function loadFromStorage(key, fallbackValue) {
    const savedValue = localStorage.getItem(key);

    if (!savedValue) {
        return fallbackValue;
    }

    return JSON.parse(savedValue);
}

/* 
   Saves the full notes list into localStorage
*/
function saveAllNotes(notes) {
    saveToStorage("nightcity-notes", notes);
}

/* 
   Loads all saved notes from localStorage
*/
function loadAllNotes() {
    return loadFromStorage("nightcity-notes", []);
}

/* 
   Deletes one note by id and saves the updated notes list
*/
function deleteNote(noteId) {
    const notes = loadAllNotes();

    const updatedNotes = notes.filter(function (note) {
        return note.id !== noteId;
    });

    saveAllNotes(updatedNotes);

    return updatedNotes;
}