function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key, fallbackValue) {
  const savedValue = localStorage.getItem(key);

  if (!savedValue) {
    return fallbackValue;
  }

  return JSON.parse(savedValue);
}

function saveAllNotes(notes) {
  saveToStorage("nightcity-notes", notes);
}

function loadAllNotes() {
  return loadFromStorage("nightcity-notes", []);
}

function deleteNote(noteId) {
  const notes = loadAllNotes();

  const updatedNotes = notes.filter(function (note) {
    return note.id !== noteId;
  });

  saveAllNotes(updatedNotes);

  return updatedNotes;
}
