const socket = io("http://localhost:3000");

socket.on("connect", () => {
  socket.emit("refreshing");
});

let noteTitle = document.getElementById("noteTitle");
let note = document.getElementById("note");

function AddNote() {
  let notes = {
    title: noteTitle.value,
    note: note.value,
  };

  socket.emit("sendNotes", notes);
}

socket.on("notes", (notes) => {
  displayNotes(notes);
  console.log(notes);
});

function displayNotes(notes) {
  let notesArray = "";

  for (let i = 0; i < notes.length; i++) {
    notesArray += `
             <div class="col-md-3 my-3">
                <div class="border p-3">
                    <h3>${notes[i].title}</h3>
                    <p>${notes[i].note}</p>
                           <button onClick="deleteNote('${notes[i]._id}')" class="btn btn-danger">delete</button>

                </div>
            </div>`;
  }
  document.getElementById("row").innerHTML = notesArray;
  console.log("done");
}


function deleteNote(noteID){

    socket.emit('deleteNote',noteID)
}