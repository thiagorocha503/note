"use strict";
// Model
var Note = /** @class */ (function () {
    function Note(id, title, desccription) {
        if (id === void 0) { id = 0; }
        if (title === void 0) { title = ""; }
        if (desccription === void 0) { desccription = ""; }
        this.id = id;
        this.title = title;
        this.description = desccription;
    }
    Note.prototype.getId = function () {
        return this.id;
    };
    Note.prototype.setId = function (id) {
        this.id = id;
    };
    return Note;
}());
