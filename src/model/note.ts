// Model
export default class Note {
    id: number;
    title: string;
    text: string;

    constructor(id: number = 0, title: string = "", desccription = "") {
        this.id = id;
        this.title = title;
        this.text = desccription;
    }

    public getId(): number {
        return this.id;
    }
    public setId(id: number): void {
        this.id = id;
    }

    public copy(): Note {
        return new Note(this.id, this.title, this.text);
    }
}
