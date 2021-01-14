function openAddModal() {
  var modal = document.getElementById("addNoteModal");
  modal.style.display = "block";

  //saveAddNoteBtn;
  var closeSpan = document.getElementById("closeAdd");
  var cancelButton = document.getElementById("cancelAddNoteBtn");
  clearAddModal();
  closeSpan.onclick = () => {
    modal.style.display = "none";
  };
  cancelButton.onclick = () => {
    modal.style.display = "none";
  };
}
function clearAddModal() {
  document.getElementById("addTitle").value = "";
  document.getElementById("addContent").value = "";
  document.getElementById("addError").innerHTML = "";
}
function saveNewNote() {
  const titleStr = document.getElementById("addTitle").value;
  const contentStr = document.getElementById("addContent").value;
  const noteData = { title: titleStr, content: contentStr };
  addNote(noteData)
    .then((response) => {
      if (response.ok) {
        var modal = document.getElementById("addNoteModal");
        modal.style.display = "none";
        //--- get the id of the added note to change the background for few seconds
        response.json().then((json) => {
          var newNoteId = json["_id"];
          updateNotesTable(newNoteId);
        });
        // -- end
      } else {
        response.text().then((error) => {
          document.getElementById("addError").innerHTML = error;
        });
      }
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("addError").innerHTML = eror;
    });
}

// // here is the first version of add new note whith no changes in backgrounds
// function saveNewNote() {
//   const titleStr = document.getElementById("addTitle").value;
//   const contentStr = document.getElementById("addContent").value;
//   const noteData = { title: titleStr, content: contentStr };
//   addNote(noteData)
//     .then((response) => {
//       if (response.ok) {
//         var modal = document.getElementById("addNoteModal");
//         modal.style.display = "none";
//         updateNotesTable();
//       } else {
//         response.text().then((error) => {
//           document.getElementById("addError").innerHTML = error;
//         });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       document.getElementById("addError").innerHTML = eror;
//     });
// }

function openEditModal(noteId) {
  var modal = document.getElementById("editNoteModal");
  modal.style.display = "block";
  var closeSpan = document.getElementById("closeEdit");
  var cancelButton = document.getElementById("cancelEditNoteBtn");
  clearAddModal();
  closeSpan.onclick = () => {
    modal.style.display = "none";
  };
  cancelButton.onclick = () => {
    modal.style.display = "none";
  };
  loadNoteData(noteId);
}

function loadNoteData(noteId) {
  // save the id of the note touse it in edit mode
  var modal = document.getElementById("editNoteModal");
  var noteIdAttribute = document.createAttribute("noteid");
  noteIdAttribute.value = noteId;
  modal.setAttributeNode(noteIdAttribute);
  // load the relevant note
  getNoteById(noteId).then((data) => {
    document.getElementById("editTitle").value = data["title"];
    document.getElementById("editContent").value = data["content"];
  });
}

function saveEditNote() {
  // get the id of note
  var modal = document.getElementById("editNoteModal");
  const noteId = modal.getAttribute("noteid");
  // get the data
  const titleStr = document.getElementById("editTitle").value;
  const contentStr = document.getElementById("editContent").value;
  // we can't update the note without knowing their id so we need to get the id in the loadnotedata
  const noteData = { _id: noteId, title: titleStr, content: contentStr };
  updateNote(noteData)
    .then((response) => {
      if (response.ok) {
        var modal = document.getElementById("editNoteModal");
        modal.style.display = "none";
        updateNotesTable(noteId); // here we add the id just to give it a different style in css to the edited note
      } else {
        response.text().then((error) => {
          document.getElementById("editError").innerHTML = error;
        });
      }
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("editError").innerHTML = eror;
    });
}
