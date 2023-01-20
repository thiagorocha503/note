// Model
class Note {
    id: number;
    title: string;
    description: string;

    constructor(id: number = 0, title: string = "", desccription = "") {
        this.id = id;
        this.title = title;
        this.description = desccription;
    }

    public getId(): number {
        return this.id;
    }
    public setId(id: number): void {
        this.id = id;
    }
}
