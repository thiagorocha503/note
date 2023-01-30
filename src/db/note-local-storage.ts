import Note from "../model/note";


export default class NoteLocalStorage {
    constructor() {
        if (localStorage.getItem("notes") === null) {
            localStorage.setItem("notes", "[]");
            localStorage.setItem("count", "1");
        }
    }

    public add(note: Note): number {
        let count = localStorage.getItem("count");
        let notesJSON = localStorage.getItem("notes");
        if (notesJSON === null || count === null) {
            localStorage.setItem("notes", "[]");
            localStorage.setItem("count", "1");
            this.add(note);
        }
        let notes: Array<any> = JSON.parse(notesJSON as string);
        let id: number = JSON.parse(count as string);
        note.setId(id);
        notes.push(note);

        localStorage.setItem("notes", JSON.stringify(notes));
        localStorage.setItem("count", JSON.stringify(id + 1));
        return id;
    }

    public deleteById(id: number): void {
        let notesJSON = localStorage.getItem("notes");
        if (notesJSON === null) {
            console.log("> Nota não Removida");
            return;
        }
        let notes: Array<any> = JSON.parse(notesJSON);
        for (let i = 0; i < notes.length; i++) {
            let oneNote = notes[i];
            if (oneNote.id === id) {
                notes.splice(i, 1);
                localStorage.setItem("notes", JSON.stringify(notes));
                console.log("> Nota Removida");
                break;
            }
        }
    }
    public fetchAll(): Array<Note> {
        let notesJSON = localStorage.getItem("notes");
        if (notesJSON === null) {
            return [];
        }
        return JSON.parse(notesJSON);
    }

    public clear(): void {
        localStorage.clear();
    }

    public update(note: Note){
        let notesJSON = localStorage.getItem("notes");
        if (notesJSON === null) {
            localStorage.setItem("notes", "[]");
            localStorage.setItem("count", "1");
            return 0;
        }
        let notes: Array<any> = JSON.parse(notesJSON);
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === note.id) {
                notes[i] = note;
                break;
            }
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        
    }

    public getNoteByID(id: number): Note | null {
        let notes = this.fetchAll();
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === id) {
                return notes[i];
            }
        }
        return null;
    }
}
