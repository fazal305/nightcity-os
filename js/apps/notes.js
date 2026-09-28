let activeNoteId = null;

function renderNotesApp(contentElement) {
  contentElement.innerHTML = `
        <div class="notes-app">
            <aside class="notes-sidebar">
                <button class="notes-new-btn" id="notes-new-btn" type="button">
                    + New Note
                </button>

                <div class="notes-list" id="notes-list"></div>
            </aside>

            <section class="notes-editor">
                <input
                    class="notes-title-input"
                    id="notes-title-input"
                    type="text"
                    placeholder="Note title..."
                >

                <textarea
                    class="notes-content-input"
                    id="notes-content-input"
                    placeholder="Write something from the neon underground..."
                ></textarea>

                <button class="notes-delete-btn" id="notes-delete-btn" type="button">
                    Delete Note
                </button>

                <p class="notes-status" id="notes-status">Auto-save ready.</p>
            </section>
        </div>
    `;

  setupNotesApp();
}

function setupNotesApp() {
  const newButton = document.querySelector("#notes-new-btn");
  const deleteButton = document.querySelector("#notes-delete-btn");
  const titleInput = document.querySelector("#notes-title-input");
  const contentInput = document.querySelector("#notes-content-input");

  const notes = loadAllNotes();

  if (notes.length === 0) {
    activeNoteId = null;
    renderNotesList();
    showEmptyState();
  } else {
    activeNoteId = notes[0].id;
    renderNotesList();
    loadActiveNote();
  }

  newButton.addEventListener("click", createNewNote);
  deleteButton.addEventListener("click", handleDeleteActiveNote);

  titleInput.addEventListener("input", saveActiveNote);
  contentInput.addEventListener("input", saveActiveNote);
}

function createNewNote() {
  const notes = loadAllNotes();

  const newNote = {
    id: `note-${Date.now()}`,
    title: "Untitled Note",
    content: "",
  };

  notes.unshift(newNote);

  saveAllNotes(notes);

  activeNoteId = newNote.id;

  renderNotesList();
  loadActiveNote();
}

function renderNotesList() {
  const notesList = document.querySelector("#notes-list");
  const notes = loadAllNotes();

  if (!notesList) {
    return;
  }

  notesList.innerHTML = "";

  if (notes.length === 0) {
    const emptyMessage = document.createElement("p");

    emptyMessage.classList.add("notes-empty-message");
    emptyMessage.textContent = "No notes yet.";

    notesList.appendChild(emptyMessage);

    return;
  }

  notes.forEach(function (note) {
    const noteButton = document.createElement("button");

    noteButton.classList.add("note-list-btn");
    noteButton.type = "button";
    noteButton.textContent = note.title || "Untitled Note";

    if (note.id === activeNoteId) {
      noteButton.classList.add("active");
    }

    noteButton.addEventListener("click", function () {
      activeNoteId = note.id;

      renderNotesList();
      loadActiveNote();
    });

    notesList.appendChild(noteButton);
  });
}

function showEmptyState() {
  const titleInput = document.querySelector("#notes-title-input");
  const contentInput = document.querySelector("#notes-content-input");

  if (titleInput) {
    titleInput.value = "";
  }

  if (contentInput) {
    contentInput.value = "";
  }

  updateNotesStatus('No notes yet. Click "+ New Note" to create one.');
}

function loadActiveNote() {
  const titleInput = document.querySelector("#notes-title-input");
  const contentInput = document.querySelector("#notes-content-input");
  const notes = loadAllNotes();

  const activeNote = notes.find(function (note) {
    return note.id === activeNoteId;
  });

  if (!activeNote || !titleInput || !contentInput) {
    return;
  }

  titleInput.value = activeNote.title;
  contentInput.value = activeNote.content;

  updateNotesStatus("Loaded note.");
}

function saveActiveNote() {
  const titleInput = document.querySelector("#notes-title-input");
  const contentInput = document.querySelector("#notes-content-input");

  let notes = loadAllNotes();

  notes = notes.map(function (note) {
    if (note.id === activeNoteId) {
      return {
        id: note.id,
        title: titleInput.value || "Untitled Note",
        content: contentInput.value,
      };
    }

    return note;
  });

  saveAllNotes(notes);

  renderNotesList();

  updateNotesStatus("Saved automatically.");
}

function handleDeleteActiveNote() {
  if (!activeNoteId) {
    return;
  }

  const updatedNotes = deleteNote(activeNoteId);

  if (updatedNotes.length === 0) {
    activeNoteId = null;
    renderNotesList();
    showEmptyState();

    return;
  }

  activeNoteId = updatedNotes[0].id;

  renderNotesList();
  loadActiveNote();

  updateNotesStatus("Deleted note.");
}

function updateNotesStatus(message) {
  const status = document.querySelector("#notes-status");

  if (!status) {
    return;
  }

  status.textContent = message;
}
