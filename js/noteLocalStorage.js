"use strict";
// Persistence
var NoteLocalStorage = /** @class */ (function () {
    function NoteLocalStorage() {
        if (localStorage.getItem("notes") == null) {
            localStorage.setItem("notes", "[]");
            localStorage.setItem("count", "1");
        }
    }
    NoteLocalStorage.prototype.add = function (newNote) {
        var count = localStorage.getItem("count");
        var notesJSON = localStorage.getItem("notes");
        if (notesJSON == null || count == null) {
            localStorage.setItem("notes", "[]");
            localStorage.setItem("count", "1");
            return;
        }
        var notes = JSON.parse(notesJSON);
        var id = JSON.parse(count);
        newNote.setId(id);
        notes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(notes));
        localStorage.setItem("count", JSON.stringify(id + 1));
    };
    NoteLocalStorage.prototype.deleteById = function (id) {
        var notesJSON = localStorage.getItem("notes");
        if (notesJSON == null) {
            console.log("> Nota não Removida");
            return;
        }
        var notes = JSON.parse(notesJSON);
        for (var i = 0; i < notes.length; i++) {
            var oneNote = notes[i];
            if (oneNote.id == id) {
                notes.splice(i, 1);
                localStorage.setItem("notes", JSON.stringify(notes));
                console.log("> Nota Removida");
                break;
            }
        }
    };
    NoteLocalStorage.prototype.fetchAll = function () {
        var notesJSON = localStorage.getItem("notes");
        if (notesJSON == null) {
            return [];
        }
        return JSON.parse(notesJSON);
    };
    NoteLocalStorage.prototype.clear = function () {
        localStorage.clear();
    };
    NoteLocalStorage.prototype.update = function (note) {
        var notesJSON = localStorage.getItem("notes");
        if (notesJSON == null) {
            localStorage.setItem("notes", "[]");
            localStorage.setItem("count", "1");
            return;
        }
        var notes = JSON.parse(notesJSON);
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id == note.id) {
                notes[i] = note;
                break;
            }
        }
        localStorage.setItem("notes", JSON.stringify(notes));
    };
    NoteLocalStorage.prototype.getNoteByID = function (id) {
        var notes = this.fetchAll();
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id == id) {
                return notes[i];
            }
        }
        return null;
    };
    return NoteLocalStorage;
}());
