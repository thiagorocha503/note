"use strict";
const CARD_ID_MASK = "card_id_";
const ENTER_KEY = "Enter";
$(() => {
    renderCards();
});
const editModal = new bootstrap.Modal(document.getElementById("edit-modal"), {
    keyboard: false,
    backdrop: 'static'
});
function onDelete() {
    const id = parseInt($("#edit-modal").attr("note-id"));
    new NoteLocalStorage().deleteById(id);
    editModal.hide();
    renderCards();
}
function onEditClose() {
    console.log("close");
    renderCards();
    editModal.hide();
}
function onNew() {
    onEdit(null);
}
function onSave() {
    let title = $("#input-title").val();
    let description = $("#input-body").val();
    if (title == "" || description == "") {
        return;
    }
    let id = parseInt($("#edit-modal").attr("note-id"));
    let note = new Note(id, title, description);
    let noteLocalStorage = new NoteLocalStorage();
    if (note.id == 0) {
        let id = noteLocalStorage.add(note);
        $("#edit-modal").attr("note-id", id);
    }
    else {
        noteLocalStorage.update(note);
    }
}
function onEdit(note) {
    var _a, _b, _c;
    $("#input-title").val((_a = note === null || note === void 0 ? void 0 : note.title) !== null && _a !== void 0 ? _a : "");
    const container = document.getElementById("modal-body-edit");
    const oldBody = document.getElementById("input-body");
    const newBody = document.createElement("textarea");
    newBody.id = "input-body";
    newBody.setAttribute("placeholder", "Enter text");
    newBody.setAttribute("style", "width: 100%; height: 100%;");
    newBody.addEventListener("keyup", () => {
        onSave();
    });
    newBody.value = (_b = note === null || note === void 0 ? void 0 : note.description) !== null && _b !== void 0 ? _b : "";
    container.replaceChild(newBody, oldBody);
    $("#edit-modal").attr("note-id", (_c = note === null || note === void 0 ? void 0 : note.id) !== null && _c !== void 0 ? _c : 0);
    editModal.show();
}
function buildCard(note) {
    let card = document.createElement("div");
    card.className = "card bg-light";
    card.setAttribute("id", CARD_ID_MASK + note.id);
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
        onEdit(note);
    });
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.style.minHeight = "250px";
    let header = document.createElement("h2");
    header.innerHTML = note.title;
    let cardText = document.createElement("p");
    cardText.innerHTML = note.description;
    cardText.className = "card-text card-text-truncate";
    cardBody.appendChild(header);
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);
    return card;
}
function buildListCard() {
    let cardList = document.createElement("div");
    cardList.className = "row pb-5 row-cols-1 row-cols-md-2 row-cols-lg-3";
    cardList.setAttribute("id", "cards");
    let notes = new NoteLocalStorage().fetchAll();
    notes.forEach((element) => {
        let column = document.createElement("div");
        column.className = "col mb-2";
        let oneCard = buildCard(element);
        column.appendChild(oneCard);
        cardList.appendChild(column);
    });
    return cardList;
}
function renderCards() {
    let container = document.getElementById("tab-list");
    let old_notes = document.getElementById("cards");
    let new_notes = buildListCard();
    if (old_notes == null) {
        return;
    }
    container === null || container === void 0 ? void 0 : container.replaceChild(new_notes, old_notes);
}
class NoteLocalStorage {
    constructor() {
        if (localStorage.getItem("notes") == null) {
            localStorage.setItem("notes", "[]");
            localStorage.setItem("count", "1");
        }
    }
    add(newNote) {
        let count = localStorage.getItem("count");
        let notesJSON = localStorage.getItem("notes");
        if (notesJSON == null || count == null) {
            localStorage.setItem("notes", "[]");
            localStorage.setItem("count", "1");
            this.add(newNote);
        }
        let notes = JSON.parse(notesJSON);
        let id = JSON.parse(count);
        newNote.setId(id);
        notes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(notes));
        localStorage.setItem("count", JSON.stringify(id + 1));
        return id;
    }
    deleteById(id) {
        let notesJSON = localStorage.getItem("notes");
        if (notesJSON == null) {
            console.log("> Nota não Removida");
            return;
        }
        let notes = JSON.parse(notesJSON);
        for (let i = 0; i < notes.length; i++) {
            let oneNote = notes[i];
            if (oneNote.id == id) {
                notes.splice(i, 1);
                localStorage.setItem("notes", JSON.stringify(notes));
                console.log("> Nota Removida");
                break;
            }
        }
    }
    fetchAll() {
        let notesJSON = localStorage.getItem("notes");
        if (notesJSON == null) {
            return [];
        }
        return JSON.parse(notesJSON);
    }
    clear() {
        localStorage.clear();
    }
    update(note) {
        let notesJSON = localStorage.getItem("notes");
        if (notesJSON == null) {
            localStorage.setItem("notes", "[]");
            localStorage.setItem("count", "1");
            return 0;
        }
        let notes = JSON.parse(notesJSON);
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id == note.id) {
                notes[i] = note;
                break;
            }
        }
        localStorage.setItem("notes", JSON.stringify(notes));
    }
    getNoteByID(id) {
        let notes = this.fetchAll();
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id == id) {
                return notes[i];
            }
        }
        return null;
    }
}
class Note {
    constructor(id = 0, title = "", desccription = "") {
        this.id = id;
        this.title = title;
        this.description = desccription;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
}
